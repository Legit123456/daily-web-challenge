import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Visit from '../models/Visit.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Helper Function: Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token valid for 30 days
  });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ email });

    // 2. Check password (using the method we wrote in User.js)
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id), // <--- THE KEY REWARD
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get Site Analytics
// @route   GET /api/users/analytics
// @access  Private (Admin Only)
router.get('/analytics', protect, async (req, res) => {
  try {
    const totalVisits = await Visit.countDocuments();
    
    // Get last 5 visits
    const recentVisits = await Visit.find()
      .sort({ timestamp: -1 })
      .limit(5);

    // Group by Device Type (Mobile vs Desktop)
    const deviceStats = await Visit.aggregate([
      { $group: { _id: "$deviceType", count: { $sum: 1 } } }
    ]);

    res.json({ totalVisits, recentVisits, deviceStats });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

export default router;