import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/users.js';
import { auth, protect } from '../middleware/auth.js';
const router = express.Router();

router.route('/').get(auth, protect, getAllUsers);
router
  .route('/:id')
  .get(auth, protect, getUser)
  .put(auth, protect, updateUser)
  .delete(auth, protect, deleteUser);

export default router;
