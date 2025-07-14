const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Register new user with enhanced logging
router.post('/register', async (req, res) => {
  try {
    console.log('📝 Registration request received');
    console.log('📋 Request body:', req.body);
    console.log('🔗 Database state:', require('mongoose').connection.readyState);
    
    const { firstName, lastName, email, password, phone } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !phone) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        missing: {
          firstName: !firstName,
          lastName: !lastName,
          email: !email,
          password: !password,
          phone: !phone
        }
      });
    }

    // Clean and validate data
    const cleanEmail = email.toLowerCase().trim();
    const cleanPhone = phone.replace(/\D/g, '');

    console.log('🧹 Cleaned data:', {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: cleanEmail,
      phone: cleanPhone
    });

    // Check database connection
    if (require('mongoose').connection.readyState !== 1) {
      console.error('❌ Database not connected');
      return res.status(500).json({
        success: false,
        message: 'Database connection error'
      });
    }

    // Check if user already exists
    console.log('🔍 Checking for existing user...');
    const existingUser = await User.findOne({ 
      $or: [
        { email: cleanEmail },
        { phone: cleanPhone }
      ]
    });

    if (existingUser) {
      console.log('❌ User already exists:', existingUser.email);
      return res.status(400).json({
        success: false,
        message: existingUser.email === cleanEmail 
          ? 'User with this email already exists' 
          : 'User with this phone number already exists'
      });
    }

    // Create new user
    console.log('👤 Creating new user...');
    const newUser = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: cleanEmail,
      password: password,
      phone: cleanPhone
    });

    console.log('💾 Saving user to database...');
    const savedUser = await newUser.save();
    console.log('✅ User saved successfully with ID:', savedUser._id);

    // Verify user was saved
    const verifyUser = await User.findById(savedUser._id);
    console.log('✅ User verification successful:', verifyUser ? 'Found' : 'Not found');

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: savedUser._id, 
        email: savedUser.email 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: savedUser._id,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          phone: savedUser.phone,
          createdAt: savedUser.createdAt
        },
        token
      }
    });

    console.log('🎉 Registration completed successfully for:', savedUser.email);

  } catch (error) {
    console.error('❌ Registration error:', error);
    console.error('❌ Error stack:', error.stack);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      console.log('❌ Validation errors:', errors);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      console.log('❌ Duplicate key error:', field);
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Login user with enhanced logging
router.post('/login', async (req, res) => {
  try {
    console.log('🔐 Login request received');
    console.log('📧 Email:', req.body.email);
    console.log('🔗 Database state:', require('mongoose').connection.readyState);
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Check database connection
    if (require('mongoose').connection.readyState !== 1) {
      console.error('❌ Database not connected');
      return res.status(500).json({
        success: false,
        message: 'Database connection error'
      });
    }

    // Find user
    console.log('🔍 Searching for user...');
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    console.log('✅ User found:', user.email);

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('✅ Login successful for:', user.email);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin
        },
        token
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile'
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, phone },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: updatedUser }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile'
    });
  }
});

// Get all users (for testing)
router.get('/all', async (req, res) => {
  try {
    console.log('📋 Fetching all users...');
    console.log('🔗 Database state:', require('mongoose').connection.readyState);
    
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    console.log(`✅ Found ${users.length} users`);
    
    res.json({
      success: true,
      message: 'Users fetched successfully',
      data: {
        users,
        count: users.length
      }
    });
  } catch (error) {
    console.error('❌ Fetch users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users'
    });
  }
});

// Delete user account
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Account deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting account'
    });
  }
});

module.exports = router;
