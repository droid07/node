const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const router = express.Router();
const advancedResults = require('../middlewares/advancedResults');
const User = require('../models/User');

router.route('/').get(advancedResults(User), getAllUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
