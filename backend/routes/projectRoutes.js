import express from 'express';
import Project from '../models/Project.js'; 
import { protect } from '../middleware/authMiddleware.js';
import upload from '../config/cloudinary.js';
import { v2 as cloudinary } from 'cloudinary'; // Import cloudinary directly for deletion
import { trackVisit } from '../middleware/trackVisit.js';

const router = express.Router();

// 1. GET ALL (Public) - STAY THE SAME
router.get('/', trackVisit, async (req, res) => { 
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// 2. CREATE (Protected) - ORDER FIXED
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { title, description, tech, github, link } = req.body;
    const imageUrl = req.file ? req.file.path : "";

    const project = new Project({
      title,
      description,
      tech: tech.split(',').map(t => t.trim()), // Ensure clean array
      github,
      link,
      image: imageUrl,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: 'Invalid Project Data', error: error.message });
  }
});

// 3. UPDATE (Protected) - ORDER FIXED + CLEANUP
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const { title, description, tech, github, link } = req.body;
    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = title || project.title;
      project.description = description || project.description;
      project.tech = tech ? tech.split(',').map(t => t.trim()) : project.tech;
      project.github = github || project.github;
      project.link = link || project.link;

      if (req.file) {
        // OPTIONAL: Delete the old image from Cloudinary here to save space
        if (project.image) {
          const publicId = project.image.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(`portfolio_projects/${publicId}`);
        }
        project.image = req.file.path;
      }

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Update Failed', error: error.message });
  }
});

// 4. DELETE (Protected) - CLOUDINARY CLEANUP ADDED
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      // DELETE IMAGE FROM CLOUDINARY FIRST
      if (project.image) {
        // Logic to extract public_id from the Cloudinary URL
        // Example URL: https://res.cloudinary.com/demo/image/upload/v1234/portfolio_projects/image_name.jpg
        const publicId = project.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`portfolio_projects/${publicId}`);
      }

      await project.deleteOne();
      res.json({ message: 'Project and associated image removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;