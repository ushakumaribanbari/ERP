// utils/generateToken.js
// Signs and returns a JWT containing userId, email, and role.

const jwt = require('jsonwebtoken');

/**
 * @param {Object} payload - { userId, email, role }
 * @returns {string} Signed JWT token
 */
const generateToken = ({ userId, email, role }) => {
  return jwt.sign(
    { userId, email, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

module.exports = generateToken;
