// backend/server.js
require('dotenv').config(); // Load .env variables FIRST
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
// Import routes (you will create these files in the next steps)
const authRoutes = require('./routes/auth.routes.js');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const messageRoutes = require('./routes/message.routes');
const usersRoutes = require('./routes/users.routes');
const adminRoutes = require('./routes/admin.routes');
const app = express();
connectDB(); // Connect to MongoDB
// ── Middleware ─────────────────────────────────────────────────
// Allow requests from any origin (adjust for production)
app.use(cors({ origin: ['http://localhost:3000', 'https://thefolio-em.vercel.app'], credentials: true }));
// Parse incoming JSON request bodies
app.use(express.json());
// Serve uploaded image files as public URLs
// e.g. http://localhost:5000/uploads/my-image.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/admin', adminRoutes);
// ── Start Server ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server is running on ${PORT}`);
});
