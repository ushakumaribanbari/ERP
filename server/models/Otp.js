// models/Otp.js
// Stores hashed OTPs — the plaintext code is NEVER persisted.
// TTL index auto-deletes documents after 5 minutes.

const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const otpSchema = new mongoose.Schema({
  email: {
    type:     String,
    required: true,
    lowercase: true,
    trim:     true,
  },
  // Only the bcrypt hash is stored — the plain code is discarded after hashing
  otpHash: {
    type:     String,
    required: true,
  },
  // Incremented on each failed attempt — lock out after 5 wrong guesses
  attempts: {
    type:    Number,
    default: 0,
  },
  // Set to true once the user enters the correct OTP
  verified: {
    type:    Boolean,
    default: false,
  },
  createdAt: {
    type:    Date,
    default: Date.now,
    expires: 300, // TTL: document auto-deleted after 300 seconds (5 minutes)
  },
});

// ── Instance method: compare a plaintext OTP against the stored hash ──
otpSchema.methods.isValidOtp = async function (plainOtp) {
  return bcrypt.compare(plainOtp, this.otpHash);
};

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
