const pool = require('../config/db');

/**
 * Get all portfolio projects
 * Optionally filter by user_id or category
 */
const getAllProjects = async (req, res) => {
  try {
    const { user_id, category, status } = req.query;
    
    let query = `
      SELECT p.*, u.full_name as author_name
      FROM portfolio_projects p
      LEFT JOIN users u ON p.user_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (user_id) {
      query += ' AND p.user_id = ?';
      params.push(user_id);
    }

    if (category) {
      query += ' AND p.category = ?';
      params.push(category);
    }

    if (status) {
      query += ' AND p.status = ?';
      params.push(status);
    } else {
      // Default to only showing published projects for non-authenticated requests
      if (!req.user) {
        query += ' AND p.status = ?';
        params.push('published');
      }
    }

    query += ' ORDER BY p.created_at DESC';

    const [projects] = await pool.query(query, params);

    return res.status(200).json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    console.error('Error fetching portfolio projects:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch portfolio projects',
      error: error.message
    });
  }
};

/**
 * Get a single portfolio project by ID
 */
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Valid project ID is required'
      });
    }

    const query = `
      SELECT p.*, u.full_name as author_name, u.email as author_email
      FROM portfolio_projects p
      LEFT JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `;

    const [projects] = await pool.query(query, [id]);

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const project = projects[0];

    // Check if project is published or if user is the owner
    if (project.status !== 'published' && (!req.user || req.user.id !== project.user_id)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to view this project'
      });
    }

    return res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch project',
      error: error.message
    });
  }
};

/**
 * Create a new portfolio project
 * Requires authentication
 */
const createProject = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const {
      title,
      description,
      category,
      image_url,
      project_url,
      technologies,
      status = 'draft'
    } = req.body;

    // Validation
    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Project title is required'
      });
    }

    if (!description || description.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Project description is required'
      });
    }

    if (!category || category.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Project category is required'
      });
    }

    // Validate status
    const validStatuses = ['draft', 'published', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be draft, published, or archived'
      });
    }

    const query = `
      INSERT INTO portfolio_projects 
      (user_id, title, description, category, image_url, project_url, technologies, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const technologiesJson = technologies ? JSON.stringify(technologies) : null;

    const [result] = await pool.query(query, [
      req.user.id,
      title.trim(),
      description.trim(),
      category.trim(),
      image_url || null,
      project_url || null,
      technologiesJson,
      status
    ]);

    // Fetch the created project
    const [newProject] = await pool.query(
      'SELECT * FROM portfolio_projects WHERE id = ?',
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject[0]
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: error.message
    });
  }
};

/**
 * Update an existing portfolio project
 * Requires authentication and ownership
 */
const updateProject = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Valid project ID is required'
      });
    }

    // Check if project exists and user owns it
    const [existingProjects] = await pool.query(
      'SELECT * FROM portfolio_projects WHERE id = ?',
      [id]
    );

    if (existingProjects.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const existingProject = existingProjects[0];

    if (existingProject.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this project'
      });
    }

    const {
      title,
      description,
      category,
      image_url,
      project_url,
      technologies,
      status
    } = req.body;

    // Build update query dynamically based on provided fields
    const updates = [];
    const values = [];

    if (title !== undefined) {
      if (title.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Project title cannot be empty'
        });
      }
      updates.push('title = ?');
      values.push(title.trim());
    }

    if (description !== undefined) {
      if (description.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Project description cannot be empty'
        });
      }
      updates.push('description = ?');
      values.push(description.trim());
    }

    if (category !== undefined) {
      if (category.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Project category cannot be empty'
        });
      }
      updates.push('category = ?');
      values.push(category.trim());
    }

    if (image_url !== undefined) {
      updates.push('image_url = ?');
      values.push(image_url || null);
    }

    if (project_url !== undefined) {
      updates.push('project_url = ?');
      values.push(project_url || null);
    }

    if (technologies !== undefined) {
      updates.push('technologies = ?');
      values.push(technologies ? JSON.stringify(technologies) : null);
    }

    if (status !== undefined) {
      const validStatuses = ['draft', 'published', 'archived'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be draft, published, or archived'
        });
      }
      updates.push('status = ?');
      values.push(status);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields provided for update'
      });
    }

    updates.push('updated_at = NOW()');
    values.push(id);

    const query = `UPDATE portfolio_projects SET ${updates.join(', ')} WHERE id = ?`;

    await pool.query(query, values);

    // Fetch updated project
    const [updatedProject] = await pool.query(
      'SELECT * FROM portfolio_projects WHERE id = ?',
      [id]
    );

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject[0]
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update project',
      error: error.message
    });
  }
};

/**
 * Delete a portfolio project
 * Requires authentication and ownership
 */
const deleteProject = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Valid project ID is required'
      });
    }

    // Check if project exists and user owns it
    const [existingProjects] = await pool.query(
      'SELECT * FROM portfolio_projects WHERE id = ?',
      [id]
    );

    if (existingProjects.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const existingProject = existingProjects[0];

    if (existingProject.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this project'
      });
    }

    await pool.query('DELETE FROM portfolio_projects WHERE id = ?', [id]);

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: { id: parseInt(id) }
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete project',
      error: error.message
    });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};