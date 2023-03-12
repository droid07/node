import express from 'express';
import { login, me, register, updateProfile } from '../controllers/auth.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.get('/profile', auth, me);
router.put('/profile', auth, updateProfile);
router.post('/login', login);
router.post('/register', register);

export default router;
