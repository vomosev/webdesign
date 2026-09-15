const bcrypt = require('bcrypt');
const { pool } = require('../config/db');

/**
 * Signup Controller
 * Creates a new user account with hashed password
 */
const signup = async (req, res) => {
  const { email, password, full_name } = req.body;

  // Validate required fields
  if (!email || !password || !full_name) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email, password, and full name are required' 
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid email format' 
    });
  }

  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({ 
      success: false, 
      message: 'Password must be at least 6 characters long' 
    });
  }

  try {
    // Check if user already exists
    const [existingUsers] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const [result] = await pool.query(
      'INSERT INTO users (email, password_hash, full_name) VALUES (?, ?, ?)',
      [email, password_hash, full_name]
    );

    // Get the newly created user
    const [newUser] = await pool.query(
      'SELECT id, email, full_name, created_at FROM users WHERE id = ?',
      [result.insertId]
    );

    // Create session
    req.session.userId = newUser[0].id;
    req.session.email = newUser[0].email;

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser[0].id,
        email: newUser[0].email,
        full_name: newUser[0].full_name,
        created_at: newUser[0].created_at
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred during signup. Please try again.' 
    });
  }
};

/**
 * Login Controller
 * Authenticates user and creates session
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }

  try {
    // Find user by email
    const [users] = await pool.query(
      'SELECT id, email, password_hash, full_name, created_at FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    const user = users[0];

    // Compare password with hash
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Create session
    req.session.userId = user.id;
    req.session.email = user.email;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred during login. Please try again.' 
    });
  }
};

/**
 * Logout Controller
 * Destroys user session
 */
const logout = async (req, res) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Logout error:', err);
          return res.status(500).json({ 
            success: false, 
            message: 'Could not log out. Please try again.' 
          });
        }

        res.clearCookie('connect.sid');
        res.status(200).json({
          success: true,
          message: 'Logout successful'
        });
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'No active session'
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred during logout. Please try again.' 
    });
  }
};

/**
 * Get Current User Controller
 * Returns current authenticated user information
 */
const getCurrentUser = async (req, res) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authenticated' 
      });
    }

    // Fetch current user data
    const [users] = await pool.query(
      'SELECT id, email, full_name, created_at FROM users WHERE id = ?',
      [req.session.userId]
    );

    if (users.length === 0) {
      req.session.destroy();
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const user = users[0];

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while fetching user data. Please try again.' 
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser
};