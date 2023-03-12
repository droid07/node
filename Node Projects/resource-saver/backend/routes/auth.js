const express = require('express');
const { register, login, getMe, logout } = require('../controllers/auth');
const protect = require('../middlewares/auth');

const router = express.Router();

router.get('/me', protect, getMe);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
