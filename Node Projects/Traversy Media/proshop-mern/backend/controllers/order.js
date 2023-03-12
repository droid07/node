import Order from '../models/Order.js';

const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order Items');
  } else {
    const order = new Order({
      user: req.user,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    return res.status(201).json({ success: true, createOrder });
  }
};

const getOrderByID = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    return res.status(200).json({ success: true, order });
  } else {
    res.status(404);
    throw new Error('Order Not Found');
  }
};

const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    return res.status(200).json({ success: true, updatedOrder });
  } else {
    res.status(404);
    throw new Error('Order Not Found');
  }
};

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user });

  res.status(200).json({ success: true, orders });
};

export { addOrderItems, getOrderByID, updateOrderToPaid, getMyOrders };
