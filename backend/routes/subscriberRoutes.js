import express from 'express';
import Subscriber from '../models/Subscriber.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Subscribe to newsletter (Public)
// @route   POST /api/subscribe
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if already subscribed
    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email already subscribed!' });
    }

    await Subscriber.create({ email });
    res.status(201).json({ message: 'Subscribed successfully! 🚀' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @desc    Get all subscribers (Admin Only)
// @route   GET /api/subscribe
router.get('/', protect, async (req, res) => {
  try {
    const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;