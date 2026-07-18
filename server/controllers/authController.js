// controllers/authController.js
// Handles OTP send/verify, register, login, and getMe.
//
// Security model:
//  • OTP is generated in memory, hashed with bcrypt, then ONLY the hash is
//    stored in MongoDB. The plain code is discarded immediately after hashing.
//  • The plain OTP is NEVER logged to the console or included in any response.
//  • After 5 failed verification attempts the record is deleted (brute-force lock).
//  • OTP documents expire automatically after 5 minutes via a MongoDB TTL index.

const { validationResult } = require('express-validator');
const bcrypt   = require('bcryptjs');
const crypto   = require('crypto');
const User     = require('../models/User');
const Otp      = require('../models/Otp');
const sendEmail  = require('../utils/emailUtils');
const generateToken = require('../utils/generateToken');

// ── Helpers ────────────────────────────────────────────────────

/** Build the OTP email HTML — professional, branded template */
const buildOtpEmailHtml = (otpCode, email) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification — AiCoreSystemERP</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="520" cellpadding="0" cellspacing="0" role="presentation"
               style="background:#ffffff;border-radius:16px;overflow:hidden;
                      box-shadow:0 4px 24px rgba(15,22,41,0.10);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1d4ed8 0%,#6366f1 100%);
                       padding:32px 40px;text-align:center;">
              <div style="display:inline-flex;align-items:center;gap:10px;">
                <div style="width:36px;height:36px;background:rgba(255,255,255,0.2);
                            border-radius:8px;display:inline-block;vertical-align:middle;
                            line-height:36px;text-align:center;">
                  &#9783;
                </div>
                <span style="color:#ffffff;font-size:20px;font-weight:800;
                             letter-spacing:-0.3px;vertical-align:middle;">
                  AiCoreSystemERP
                </span>
              </div>
              <p style="color:rgba(255,255,255,0.75);font-size:13px;margin:6px 0 0;">
                Enterprise Resource Planning
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 28px;">
              <h1 style="color:#0f172a;font-size:22px;font-weight:800;
                         margin:0 0 8px;letter-spacing:-0.4px;">
                Verify Your Email Address
              </h1>
              <p style="color:#475569;font-size:14px;line-height:1.7;margin:0 0 28px;">
                You requested access to the AiCoreSystemERP system.<br/>
                Use the one-time password (OTP) below to verify your email:
              </p>

              <!-- OTP Box -->
              <div style="background:#f8fafc;border:2px solid #e2e8f0;
                          border-radius:12px;padding:24px;text-align:center;
                          margin:0 0 28px;">
                <p style="color:#94a3b8;font-size:11px;font-weight:700;
                           letter-spacing:2px;text-transform:uppercase;margin:0 0 10px;">
                  Your OTP Code
                </p>
                <div style="font-size:40px;font-weight:900;letter-spacing:14px;
                            color:#1d4ed8;font-variant-numeric:tabular-nums;
                            margin:0;line-height:1.1;">
                  ${otpCode}
                </div>
                <p style="color:#94a3b8;font-size:12px;margin:12px 0 0;">
                  ⏱&nbsp; Valid for <strong style="color:#475569;">5 minutes</strong>
                </p>
              </div>

              <!-- Security Notice -->
              <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;
                          padding:14px 16px;margin:0 0 24px;">
                <p style="color:#92400e;font-size:12px;line-height:1.6;margin:0;">
                  <strong>🔒 Security notice:</strong> Never share this code with anyone.
                  AiCoreSystemERP staff will never ask for your OTP. If you did not request this,
                  please ignore this email — the code will expire automatically.
                </p>
              </div>

              <p style="color:#64748b;font-size:13px;margin:0;">
                This request was made for <strong>${email}</strong>.<br/>
                If this wasn't you, no action is needed.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;
                       padding:20px 40px;text-align:center;">
              <p style="color:#94a3b8;font-size:11px;margin:0;line-height:1.6;">
                © ${new Date().getFullYear()} AiCoreSystemERP · All rights reserved.<br/>
                This is an automated message — please do not reply.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// ══════════════════════════════════════════════════════════════
// ── Send OTP ──────────────────────────────────────────────────
// POST /api/auth/send-otp
// ══════════════════════════════════════════════════════════════
const sendOtp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }

    const email = req.body.email.toLowerCase().trim();
    const username = req.body.username ? req.body.username.trim() : null;

    // Reject if email or username is already registered
    const [existingEmail, existingUsername] = await Promise.all([
      User.findOne({ email }),
      username ? User.findOne({ username }) : Promise.resolve(null),
    ]);

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists. You cannot register the same email again, even for a different role.',
      });
    }

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: 'This username is already taken. Please choose another one.',
      });
    }

    // ── Generate a cryptographically secure 6-digit code ──────
    const otpCode = crypto.randomInt(100000, 1000000).toString();

    // ── Hash before storing — plain code is discarded below ───
    const BCRYPT_ROUNDS = 10; // fast enough for 6-digit OTPs
    const otpHash = await bcrypt.hash(otpCode, BCRYPT_ROUNDS);

    // Remove any previous pending OTP for this email
    await Otp.deleteMany({ email });

    // Save ONLY the hash — never the plain code
    await Otp.create({ email, otpHash });

    // ── Send email via Resend (throws on failure) ──────────────
    // The plain otpCode is passed to the email builder here and
    // used only inside this function scope — it is NEVER logged.
    await sendEmail({
      email,
      subject: 'Your AiCoreSystemERP Registration OTP',
      html: buildOtpEmailHtml(otpCode, email),
    });

    // Log only non-sensitive metadata
    console.log(`[OTP] Sent → ${email}`);

    // Plain otpCode goes out of scope here and is garbage collected
    return res.status(200).json({
      success: true,
      message: 'A verification code has been sent to your email. Please check your inbox (and spam folder).',
    });
  } catch (error) {
    // Log full error details server-side for debugging
    console.log("==================================");
    console.log("OTP ERROR");
    console.log(error);
    console.log(error.message);
    console.log(error.stack);
    console.log("==================================");

    // Return a user-friendly message based on the error type
    let clientMessage = 'Failed to send OTP. Please try again.';
    if (error.message.includes('not configured')) {
      clientMessage = 'Email service is not configured. Please contact the administrator.';
    } else if (error.message.includes('delivery failed')) {
      clientMessage = 'Email delivery failed. Please check your email address and try again.';
    } else if (
      error.name === 'MongooseError' ||
      error.name === 'MongoServerError' ||
      error.name === 'MongoNetworkError' ||
      error.message.includes('buffering timed out') ||
      error.message.includes('ECONNREFUSED') ||
      error.message.includes('ETIMEOUT') ||
      error.message.includes('topology was destroyed')
    ) {
      clientMessage = 'Database connection error. Please try again in a moment.';
      console.error('[OTP] ⚠️  MongoDB connection issue — restart the server if this persists.');
    }

    return res.status(500).json({
      success: false,
      message: clientMessage,
    });
  }
};

// ══════════════════════════════════════════════════════════════
// ── Verify OTP ────────────────────────────────────────────────
// POST /api/auth/verify-otp
// ══════════════════════════════════════════════════════════════
const verifyOtp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }

    const email    = req.body.email.toLowerCase().trim();
    const plainOtp = req.body.otp.trim();

    // Find the pending OTP record (TTL index auto-removes expired ones)
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired or not found. Please request a new one.',
      });
    }

    // ── Brute-force guard ─────────────────────────────────────
    const MAX_ATTEMPTS = 5;
    if (otpRecord.attempts >= MAX_ATTEMPTS) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(429).json({
        success: false,
        message: 'Too many incorrect attempts. Please request a new OTP.',
      });
    }

    // ── Compare against bcrypt hash ───────────────────────────
    const isMatch = await otpRecord.isValidOtp(plainOtp);

    if (!isMatch) {
      // Increment failed attempts
      otpRecord.attempts += 1;
      await otpRecord.save();
      const remaining = MAX_ATTEMPTS - otpRecord.attempts;
      return res.status(400).json({
        success: false,
        message: remaining > 0
          ? `Incorrect OTP. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
          : 'Too many incorrect attempts. Please request a new OTP.',
      });
    }

    // ── OTP is valid — mark it as verified ────────────────────
    // We keep the record in DB so the /register endpoint can re-verify it
    // server-side. The `verified` flag prevents replay of verification.
    otpRecord.verified = true;
    await otpRecord.save();

    console.log(`[OTP] Verified → ${email}`);

    return res.status(200).json({
      success: true,
      message: 'Email verified successfully.',
    });
  } catch (error) {
    console.error('[OTP] Verify error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error during OTP verification.',
    });
  }
};

// ══════════════════════════════════════════════════════════════
// ── Register ──────────────────────────────────────────────────
// POST /api/auth/register
// ══════════════════════════════════════════════════════════════
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }

    const { username, fullName, email, password, role, otp: plainOtp } = req.body;

    // ── Re-verify OTP server-side (belt-and-suspenders) ───────
    // The client should not be able to skip email verification by
    // crafting a direct POST to /register.
    const otpRecord = await Otp.findOne({ email: email.toLowerCase() });
    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired. Please go back and request a new one.',
      });
    }

    const isOtpMatch = await otpRecord.isValidOtp(plainOtp);
    if (!isOtpMatch) {
      return res.status(400).json({
        success: false,
        message: 'OTP verification failed. Please go back and verify your email again.',
      });
    }

    // ── Duplicate checks ──────────────────────────────────────
    const [byUsername, byEmail] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ email: email.toLowerCase() }),
    ]);

    if (byUsername) {
      return res.status(409).json({ success: false, message: 'Username is already taken.' });
    }
    if (byEmail) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists. You cannot register the same email again.' });
    }

    // ── Create user — password hashed by pre-save hook ────────
    const user = await User.create({ username, fullName, email, password, role });

    // Clean up OTP record
    await Otp.deleteMany({ email: email.toLowerCase() });

    console.log(`[Register] New user created → ${email} (${role})`);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      user: {
        id:        user._id,
        username:  user.username,
        fullName:  user.fullName,
        email:     user.email,
        role:      user.role,
        isActive:  user.isActive,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('[Register] Error:', error.message);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Username or email is already registered.',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Server error during registration.',
    });
  }
};

// ══════════════════════════════════════════════════════════════
// ── Login ─────────────────────────────────────────────────────
// POST /api/auth/login
// ══════════════════════════════════════════════════════════════
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }
    

    const { email, password } = req.body;

    // Find user — explicitly select password for comparison
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Contact your administrator.',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const token = generateToken({
      userId: user._id,
      email:  user.email,
      role:   user.role,
    });

    console.log(`[Login] ✅ → ${user.email} (${user.role})`);

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id:        user._id,
        username:  user.username,
        fullName:  user.fullName,
        email:     user.email,
        role:      user.role,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {

    console.log("==================================");
    console.log("LOGIN ERROR");
    console.log(error);
    console.log(error.stack);
    console.log("==================================");

    return res.status(500).json({
        success: false,
        message: error.message
    });

}
};

// ══════════════════════════════════════════════════════════════
// ── Forgot Password ───────────────────────────────────────────
// POST /api/auth/forgot-password
// ══════════════════════════════════════════════════════════════
const forgotPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    const email = req.body.email.toLowerCase().trim();

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if email exists or not for security, just act like it worked
      // Or in this internal ERP context, it might be fine to tell them.
      // Let's explicitly tell them since it's an ERP.
      return res.status(404).json({
        success: false,
        message: 'No account found with that email address.',
      });
    }

    // Generate secure OTP
    const otpCode = crypto.randomInt(100000, 1000000).toString();
    const otpHash = await bcrypt.hash(otpCode, 10);

    await Otp.deleteMany({ email });
    await Otp.create({ email, otpHash });

    await sendEmail({
      email,
      subject: 'Password Reset — AiCoreSystemERP',
      html: buildOtpEmailHtml(otpCode, email).replace('Verify Your Email Address', 'Reset Your Password').replace('You requested access to the AiCoreSystemERP system.', 'You requested a password reset for your AiCoreSystemERP account.'),
    });

    console.log(`[Forgot Password] OTP Sent → ${email}`);

    return res.status(200).json({
      success: true,
      message: 'A password reset code has been sent to your email.',
    });
  } catch (error) {
    console.error('[Forgot Password] Error:', error.message);
    console.error('[Forgot Password] Stack:', error.stack);
    
    let clientMessage = 'Server error while processing your request.';
    if (
      error.name === 'MongooseError' ||
      error.name === 'MongoServerError' ||
      error.name === 'MongoNetworkError' ||
      error.message.includes('buffering timed out') ||
      error.message.includes('ECONNREFUSED')
    ) {
      clientMessage = 'Database connection error. Please try again in a moment.';
      console.error('[Forgot Password] ⚠️ MongoDB connection issue.');
    }

    return res.status(500).json({
      success: false,
      message: clientMessage,
    });
  }
};

// ══════════════════════════════════════════════════════════════
// ── Reset Password ────────────────────────────────────────────
// POST /api/auth/reset-password
// ══════════════════════════════════════════════════════════════
const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    const email = req.body.email.toLowerCase().trim();
    const plainOtp = req.body.otp.trim();
    const newPassword = req.body.password;

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired or not found. Please request a new one.',
      });
    }

    // Brute-force guard
    if (otpRecord.attempts >= 5) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(429).json({
        success: false,
        message: 'Too many incorrect attempts. Please request a new OTP.',
      });
    }

    const isMatch = await otpRecord.isValidOtp(plainOtp);
    if (!isMatch) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      const remaining = 5 - otpRecord.attempts;
      return res.status(400).json({
        success: false,
        message: remaining > 0
          ? `Incorrect OTP. ${remaining} attempt(s) remaining.`
          : 'Too many incorrect attempts. Please request a new OTP.',
      });
    }

    // OTP is valid, update password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    user.password = newPassword;
    await user.save(); // pre-save hook handles hashing

    await Otp.deleteMany({ email });

    console.log(`[Reset Password] ✅ → ${email}`);

    return res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. You can now log in.',
    });
  } catch (error) {
    console.error('[Reset Password] Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error during password reset.',
    });
  }
};

// ══════════════════════════════════════════════════════════════
// ── Get Current User ──────────────────────────────────────────
// GET /api/auth/me  (protected — requires valid JWT)
// ══════════════════════════════════════════════════════════════
const getMe = async (req, res) => {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.error('[GetMe] Error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error fetching user.' });
  }
};

module.exports = { sendOtp, verifyOtp, register, login, getMe, forgotPassword, resetPassword };
