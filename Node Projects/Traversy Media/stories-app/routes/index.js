const express = require('express');
const { login, dashboard } = require('../controllers');
const { ensureGuest, ensureAuth } = require('../middlewares/auth');

const router = express.Router();

router.get('/', ensureGuest, login);
router.get('/dashboard', ensureAuth, dashboard);

module.exports = router;
