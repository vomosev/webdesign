const express = require('express');
const router = express.Router();
const { signup, login, logout, getCurrentUser } = require('../controllers/authController');
const { requireAuth, optionalAuth } = require('../middleware/auth');

// POST /api/auth/signup - Register a new user
router.post('/signup', async (req, res) => {
  try {
    await signup(req, res);
  } catch (error) {
    console.error('Signup route error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error during signup' 
    });
  }
});

// POST /api/auth/login - Authenticate user and create session
router.post('/login', async (req, res) => {
  try {
    await login(req, res);
  } catch (error) {
    console.error('Login route error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error during login' 
    });
  }
});

// POST /api/auth/logout - End user session
router.post('/logout', requireAuth, async (req, res) => {
  try {
    await logout(req, res);
  } catch (error) {
    console.error('Logout route error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error during logout' 
    });
  }
});

// GET /api/auth/me - Get current authenticated user
router.get('/me', optionalAuth, async (req, res) => {
  try {
    await getCurrentUser(req, res);
  } catch (error) {
    console.error('Get current user route error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error retrieving user information' 
    });
  }
});

module.exports = router;