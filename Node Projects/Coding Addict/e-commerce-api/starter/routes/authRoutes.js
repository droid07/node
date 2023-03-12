const express = require('express');
const {
  login,
  register,
  logout,
  updateUserPassword,
  updateUser,
  showCurrentUser,
} = require('../controllers/authController');
const { auth } = require('../middleware/authentication');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.patch('/updateUserPassword', auth, updateUserPassword);
router.patch('/updateUser', auth, updateUser);
router.get('/me', auth, showCurrentUser);
router.get('/logout', logout);

module.exports = router;
