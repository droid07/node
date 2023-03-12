const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { auth, authorize } = require('../middleware/authentication');

router.use(auth);
router.use(authorize('admin'));

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
