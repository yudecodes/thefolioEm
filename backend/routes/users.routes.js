// backend/routes/users.routes.js
const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const router = express.Router();

// ── GET /api/users/:id/profile ──────────────────────────────
// Get public profile of any user with their posts
router.get('/:id/profile', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const posts = await Post.find({ author: req.params.id })
      .populate('author', 'name profilePic')
      .sort({ createdAt: -1 });
    
    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
