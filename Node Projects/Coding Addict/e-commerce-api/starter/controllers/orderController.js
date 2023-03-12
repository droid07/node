const Order = require('../models/Order');
const Product = require('../models/Product');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const checkPermissions = require('../utils/checkPermissions');

const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.status(StatusCodes.OK).json({ success: true, orders });
};

const getSingleOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new CustomError.NotFoundError('Order not found');
  }

  checkPermissions(req.user, order.user);

  res.status(StatusCodes.OK).json({ success: true, order });
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ success: true, orders });
};

const fakeStrpieAPI = async ({ amount, currency }) => {
  const client_secret = 'lisaisabae';
  return { client_secret, amount };
};

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No cart items provided');
  }

  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      'Please provide tax and shipping fee'
    );
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });

    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product found with id : ${item.product}`
      );
    }
    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      image,
      price,
      product: _id,
    };
    // ADD ITEM TO ORDER!
    orderItems = [...orderItems, singleOrderItem];
    subtotal = subtotal + item.amount * price;
  }
  const total = tax + shippingFee + subtotal;

  // GET CLIENT SECRET!
  const paymentIntent = await fakeStrpieAPI({
    amount: total,
    currency: 'inr',
  });

  const order = await Order.create({
    tax,
    shippingFee,
    subtotal,
    total,
    orderItems,
    user: req.user.userId,
    clientSecret: paymentIntent.client_secret,
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, order, clientSecret: order.clientSecret });
};

const updateOrder = async (req, res) => {
  const { paymentIntentId } = req.body;
  const order = await Order.findOne({ _id: req.params.id });

  if (!order) {
    throw new CustomError.NotFoundError('Order not found');
  }

  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = 'paid';

  await order.save();

  res.status(StatusCodes.OK).json({ success: true, order });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
