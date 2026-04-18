const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

// POST /api/messages — Create a new message from contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const newMessage = new Message({
      name,
      email,
      message,
      read: false,
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
