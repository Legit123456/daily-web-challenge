import express from 'express';
import Project from '../models/Project.js'; 
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({}); // Empty object {} means "Find All"
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Public (We will lock this down later)
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, tech, github, link } = req.body;

    const project = new Project({
      title,
      description,
      tech,
      github,
      link,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: 'Invalid Project Data', error: error.message });
  }
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Public
router.put('/:id', protect, async (req, res) => {
  try {
    const { title, description, tech, github, link } = req.body;
    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = title || project.title;
      project.description = description || project.description;
      project.tech = tech || project.tech;
      project.github = github || project.github;
      project.link = link || project.link;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Public (for now)
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await project.deleteOne(); // Delete from DB
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;