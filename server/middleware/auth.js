const db = require('../config/db');

/**
 * Middleware to check if user is authenticated
 * Attaches user object to req.user if session is valid
 * Calls next() to allow request to continue
 */
async function optionalAuth(req, res, next) {
  try {
    if (req.session && req.session.userId) {
      const [rows] = await db.query(
        'SELECT id, email, full_name, created_at FROM users WHERE id = ?',
        [req.session.userId]
      );

      if (rows.length > 0) {
        req.user = rows[0];
      } else {
        // User doesn't exist anymore, clear session
        req.session.userId = null;
      }
    }
    next();
  } catch (error) {
    console.error('Error in optionalAuth middleware:', error);
    next();
  }
}

/**
 * Middleware to require authentication
 * Returns 401 if user is not authenticated
 * Otherwise attaches user to req.user and calls next()
 */
async function requireAuth(req, res, next) {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'You must be logged in to access this resource'
      });
    }

    const [rows] = await db.query(
      'SELECT id, email, full_name, created_at FROM users WHERE id = ?',
      [req.session.userId]
    );

    if (rows.length === 0) {
      // User doesn't exist, clear session
      req.session.userId = null;
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'User account not found'
      });
    }

    req.user = rows[0];
    next();
  } catch (error) {
    console.error('Error in requireAuth middleware:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while verifying authentication'
    });
  }
}

/**
 * Middleware to check if user owns a resource
 * Requires userId parameter in request body or params
 */
function checkResourceOwnership(req, res, next) {
  try {
    const resourceUserId = req.body.userId || req.params.userId;
    
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'You must be logged in to access this resource'
      });
    }

    if (!resourceUserId) {
      // If no userId specified, allow through (will be checked in controller)
      return next();
    }

    if (req.user.id !== parseInt(resourceUserId)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You do not have permission to access this resource'
      });
    }

    next();
  } catch (error) {
    console.error('Error in checkResourceOwnership middleware:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while checking resource ownership'
    });
  }
}

module.exports = {
  optionalAuth,
  requireAuth,
  checkResourceOwnership
};