const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require('../controllers/orderController');
const { auth, authorize } = require('../middleware/authentication');

router.use(auth);

router.route('/').post(createOrder).get(authorize('admin'), getAllOrders);

router.route('/showAllMyOrders').get(getCurrentUserOrders);

router.route('/:id').get(getSingleOrder).patch(updateOrder);

module.exports = router;
