// utils/emailUtils.js
// Sends transactional email via Gmail SMTP (Nodemailer).
// Requires GMAIL_USER and GMAIL_APP_PASSWORD in .env
//
// HOW TO GET YOUR APP PASSWORD:
//   1. Go to https://myaccount.google.com/security
//   2. Enable 2-Step Verification (required)
//   3. Go to https://myaccount.google.com/apppasswords
//   4. Select "Mail" + "Windows Computer" → Generate
//   5. Copy the 16-character password into .env as GMAIL_APP_PASSWORD

const nodemailer = require('nodemailer');

// ── Create reusable transporter ───────────────────────────────
// We create it once per request so that env vars are always fresh.
const createTransporter = () => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error(
      'Email not configured. Add GMAIL_USER and GMAIL_APP_PASSWORD to your .env file.'
    );
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER.trim(),
      // Google shows App Passwords with spaces (e.g. "abcd efgh ijkl mnop")
      // Strip ALL whitespace so it works whether or not the user copied spaces
      pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
    },
  });
};

// ── Main send function ────────────────────────────────────────
const sendEmail = async ({ email, subject, html }) => {
  const transporter = createTransporter();

  try {
    const info = await transporter.sendMail({
      from: `"NexusERP" <${process.env.GMAIL_USER}>`,
      to:      email,
      subject,
      html,
    });

    // Log only non-sensitive metadata (no OTP content ever appears here)
    console.log(`[Email] ✅ Delivered → ${email} | Message ID: ${info.messageId}`);
  } catch (err) {
    // Log technical details server-side only — never expose to client
    console.error('[Email] ❌ Delivery failed:', err.message);
    throw new Error('Email delivery failed. Please try again.');
  }
};

module.exports = sendEmail;
