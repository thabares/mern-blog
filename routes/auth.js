const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const auth = require('../middleware/auth'); // Import the auth middleware

// Middleware to set cookies securely
const setCookies = (res, token, refreshToken) => {
  res.cookie('token', token, {
    httpOnly: true, // Prevents JavaScript access to the cookie
    secure: process.env.NODE_ENV === 'production', // Use only over HTTPS in production
    sameSite: 'Strict', // Helps prevent CSRF attacks
    maxAge: 15 * 1000, //15 * 60 * 1000, // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 30 * 1000, //7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// Register
router.post('/register', async (req, res) => {
  const { fullName, username, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Password does not match' });
    }

    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'Username already exists' });

    user = new User({
      fullName,
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });
    await user.save();

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
      expiresIn: '15s',
    });
    const refreshToken = jwt.sign(
      { user: { id: user.id } },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '30s' }
    );

    user.refreshToken = refreshToken;
    await user.save();

    setCookies(res, token, refreshToken);
    res.send({ message: 'Registered successfully' });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
      expiresIn: '15s',
    });
    const refreshToken = jwt.sign(
      { user: { id: user.id } },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '30s' }
    );

    user.refreshToken = refreshToken;
    await user.save();

    setCookies(res, token, refreshToken);
    res.send({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Refresh Token
router.post('/token', async (req, res) => {
  const { refreshToken } = req.cookies; // Access the cookie
  console.log('Received refresh token:', refreshToken);
  if (!refreshToken) return res.sendStatus(401); // No refresh token provided

  const user = await User.findOne({ refreshToken });
  if (!user) return res.sendStatus(403); // No user found with this refresh token

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err, decoded) => {
      console.log('Refresh token expired or invalid'); // Log token verification failure
      if (err) return res.sendStatus(403); // Refresh token is invalid or expired

      console.log('Refresh token valid, generating new access token'); // Log success

      const newToken = jwt.sign(
        { user: { id: user.id } },
        process.env.JWT_SECRET,
        { expiresIn: '15s' }
      );

      const newRefreshToken = jwt.sign(
        { user: { id: user.id } },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '30s' }
      );

      user.refreshToken = newRefreshToken;
      await user.save();

      setCookies(res, newToken, newRefreshToken);
      res.send({ message: 'Tokens refreshed' });
    }
  );
});

router.get('/checkAuth', auth, (req, res) => {
  // If auth middleware passes, the token is valid, and we respond with OK
  res.sendStatus(200);
});

// Protected route example
router.get('/protected', auth, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('refreshToken');
  res.send({ message: 'Logged out successfully' });
});

module.exports = router;
