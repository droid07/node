import express from 'express';
import {
  addOrderItems,
  getOrderByID,
  updateOrderToPaid,
  getMyOrders,
} from '../controllers/order.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.post('/', auth, addOrderItems);
router.get('/myorders', auth, getMyOrders);
router.get('/:id', auth, getOrderByID);
router.put('/:id/pay', auth, updateOrderToPaid);

export default router;
