const { admin, db } = require('../config/firebase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Authenticate user and get token
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRef = db.collection('users').where('email', '==', email).limit(1);
    const snapshot = await userRef.get();

    if (snapshot.empty) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = snapshot.docs[0].data();

    if (await bcrypt.compare(password, user.password)) {
      res.json({
        id: snapshot.docs[0].id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(snapshot.docs[0].id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Register new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userRef = db.collection('users').where('email', '==', email).limit(1);
    const snapshot = await userRef.get();

    if (!snapshot.empty) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    };

    const newUserRef = await db.collection('users').add(user);
    const newUser = await newUserRef.get();

    res.status(201).json({
      id: newUser.id,
      ...newUser.data(),
      token: generateToken(newUser.id),
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.user.id);
    const user = await userRef.get();

    if (user.exists) {
      res.json(user.data());
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.user.id);
    const user = await userRef.get();

    if (user.exists) {
      const { name, email, password } = req.body;
      const updatedData = {
        name: name || user.data().name,
        email: email || user.data().email,
      };

      if (password) {
        updatedData.password = await bcrypt.hash(password, 10);
      }

      await userRef.update(updatedData);
      const updatedUser = await userRef.get();

      res.json({
        id: updatedUser.id,
        ...updatedUser.data(),
        token: generateToken(updatedUser.id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
};
