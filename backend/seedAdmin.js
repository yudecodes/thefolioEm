// backend/seedAdmin.js
require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');

connectDB().then(async () => {
  const exists = await User.findOne({ email: 'admin@thefolio.com' });
  
  if (exists) {
    // Delete the old one so we can re-create it properly
    await User.deleteOne({ email: 'admin@thefolio.com' });
    console.log('Removed old admin account.');
  }

  const admin = new User({  
    name: 'TheFolio Admin',
    email: 'admin@thefolio.com',
    password: 'Admin@1234',
    role: 'admin',
  });

  await admin.save();  

  console.log('✅ Admin account created successfully!');
  console.log('Email: admin@thefolio.com');
  console.log('Password: Admin@1234');
  process.exit();
});