const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const { requireAuth, optionalAuth } = require('../middleware/auth');

// GET /portfolio - Get all projects (public)
router.get('/', portfolioController.getAllProjects);

// GET /portfolio/:id - Get single project by ID (public)
router.get('/:id', portfolioController.getProjectById);

// POST /portfolio - Create new project (protected)
router.post('/', requireAuth, portfolioController.createProject);

// PUT /portfolio/:id - Update project (protected)
router.put('/:id', requireAuth, portfolioController.updateProject);

// DELETE /portfolio/:id - Delete project (protected)
router.delete('/:id', requireAuth, portfolioController.deleteProject);

module.exports = router;