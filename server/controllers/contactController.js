const { pool: db } = require('../config/db');

/**
 * Submit contact form
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function submitContactForm(req, res) {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Validate name length
    if (name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Name must be between 2 and 100 characters'
      });
    }

    // Validate email length
    if (email.trim().length > 255) {
      return res.status(400).json({
        success: false,
        error: 'Email must not exceed 255 characters'
      });
    }

    // Validate message length
    if (message.trim().length < 10 || message.trim().length > 2000) {
      return res.status(400).json({
        success: false,
        error: 'Message must be between 10 and 2000 characters'
      });
    }

    // Insert contact submission into database
    const query = `
      INSERT INTO contact_submissions (name, email, message, created_at)
      VALUES (?, ?, ?, NOW())
    `;

    const [result] = await db.execute(query, [
      name.trim(),
      email.trim().toLowerCase(),
      message.trim()
    ]);

    if (!result.insertId) {
      throw new Error('Failed to save contact submission');
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      submissionId: result.insertId
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Handle specific database errors
    if (error.code === 'ER_NO_SUCH_TABLE') {
      return res.status(500).json({
        success: false,
        error: 'Database table not found. Please ensure database is properly set up.'
      });
    }

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        error: 'Duplicate submission detected'
      });
    }

    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        error: 'Database connection failed'
      });
    }

    res.status(500).json({
      success: false,
      error: 'An error occurred while submitting the form. Please try again later.'
    });
  }
}

module.exports = {
  submitContactForm
};
