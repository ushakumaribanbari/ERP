// routes/authRoutes.js
// Defines authentication API routes with validation rules.

const express = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { register, login, getMe, sendOtp, verifyOtp, forgotPassword, resetPassword } = require('../controllers/authController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { ROLES } = require('../models/User');

const router = express.Router();

// ── Validation rules ──────────────────────────────────────────

const sendOtpValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .custom((value) => {
      if (!value.toLowerCase().endsWith('@gmail.com')) {
        throw new Error('Only @gmail.com accounts are allowed to register');
      }
      return true;
    }),
  // NOTE: Do NOT use .normalizeEmail() here — it converts gmail.com → googlemail.com
  // which breaks our custom validator and the DB lookup.
];

const verifyOtpValidation = [
  ...sendOtpValidation,
  body('otp').notEmpty().withMessage('OTP is required'),
];

const registerValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 characters'),

  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Full name must be 2–100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .custom((value) => {
      if (!value.toLowerCase().endsWith('@gmail.com')) {
        throw new Error('Only @gmail.com accounts are allowed to register');
      }
      return true;
    }),

  body('otp')
    .trim()
    .notEmpty().withMessage('OTP is required for registration'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[@$!%*?&#^_-]/).withMessage('Password must contain at least one special character'),

  body('role')
    .optional()
    .isIn(ROLES).withMessage(`Role must be one of: ${ROLES.join(', ')}`),
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required'),
];

const forgotPasswordValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),
];

const resetPasswordValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),

  body('otp')
    .trim()
    .notEmpty().withMessage('OTP is required'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[@$!%*?&#^_-]/).withMessage('Password must contain at least one special character'),
];

// ── Rate Limiters ──────────────────────────────────────────────
const sendOtpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'development' ? 100 : 3, // 100 requests in dev, 3 in prod
  message: { success: false, message: 'Too many OTP requests from this IP, please try again after 15 minutes.' }
});

const verifyOtpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: process.env.NODE_ENV === 'development' ? 100 : 5, // 100 attempts in dev, 5 in prod
  message: { success: false, message: 'Too many verification attempts from this IP, please try again after 5 minutes.' }
});

// ── Routes ─────────────────────────────────────────────────────

// POST /api/auth/send-otp — Public
router.post('/send-otp', sendOtpLimiter, sendOtpValidation, sendOtp);

// POST /api/auth/verify-otp — Public
router.post('/verify-otp', verifyOtpLimiter, verifyOtpValidation, verifyOtp);

// POST /api/auth/register — Public
router.post('/register', registerValidation, register);

// POST /api/auth/login — Public
router.post('/login', loginValidation, login);

// GET /api/auth/me — Protected (requires valid JWT)
router.get('/me', authenticateUser, getMe);

// POST /api/auth/forgot-password — Public
router.post('/forgot-password', sendOtpLimiter, forgotPasswordValidation, forgotPassword);

// POST /api/auth/reset-password — Public
router.post('/reset-password', verifyOtpLimiter, resetPasswordValidation, resetPassword);

module.exports = router;
