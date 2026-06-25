// middleware/roleMiddleware.js
// Role-based authorization middleware.
// Usage: authorizeRoles("Admin")  or  authorizeRoles("Admin", "HR")

/**
 * Returns middleware that allows only specified roles.
 * Must be used AFTER authenticateUser (req.user must be set).
 * @param {...string} roles - Allowed role names
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated.',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Role '${req.user.role}' is not authorized for this resource.`,
        requiredRoles: roles,
      });
    }

    next();
  };
};

module.exports = { authorizeRoles };
