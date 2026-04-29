console.log("Auth routes working...");
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// ✅ SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const { username, password, role, name, classId } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // create user
    const newUser = new User({
      username,
      password,
      role,
      name,
      classId
    });

    await newUser.save();

    res.json({ message: 'Signup successful' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// ✅ LOGIN (your existing one)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        name: user.name,
        classId: user.classId
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

export default router;