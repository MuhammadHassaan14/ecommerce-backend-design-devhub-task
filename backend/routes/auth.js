const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

// GET Login Page
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login - eCommerce', error: null });
});

// GET Signup Page
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign Up - eCommerce', error: null });
});

// POST Register User
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.render('signup', { title: 'Sign Up - eCommerce', error: 'User already exists' });
    }
    const user = await User.create({ name, email, password });
    if (user) {
      const token = generateToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 30 * 24 * 60 * 60 * 1000 });
      res.redirect('/');
    }
  } catch (error) {
    res.render('signup', { title: 'Sign Up - eCommerce', error: 'Error creating account' });
  }
});

// POST Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 30 * 24 * 60 * 60 * 1000 });
      res.redirect('/');
    } else {
      res.render('login', { title: 'Login - eCommerce', error: 'Invalid email or password' });
    }
  } catch (error) {
    res.render('login', { title: 'Login - eCommerce', error: 'Error logging in' });
  }
});

// GET Logout
router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/auth/login');
});

module.exports = router;
