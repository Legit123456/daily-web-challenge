import express from 'express';
import Blog from '../models/Blog.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../config/cloudinary.js'; // Reuse your existing Cloudinary config

const router = express.Router();

// @desc    Get all blogs (Public)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get single blog by SLUG (Public)
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (blog) res.json(blog);
    else res.status(404).json({ message: 'Blog not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create Blog (Admin)
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { title, content, category, readTime } = req.body;
    
    // Auto-generate slug (e.g., "Hello World" -> "hello-world")
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const imageUrl = req.file ? req.file.path : "";

    const blog = await Blog.create({
      title,
      slug,
      content,
      category,
      readTime,
      image: imageUrl
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
});

// @desc    Delete Blog (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      await blog.deleteOne();
      res.json({ message: 'Post deleted' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;