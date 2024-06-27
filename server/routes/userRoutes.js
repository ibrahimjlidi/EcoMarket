const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');

router.post('/login', authUser);
router.route('/').post(registerUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

module.exports = router;
