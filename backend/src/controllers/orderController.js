const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  const order = await Order.create({
    user: req.user.id,
    items: req.body.items,
    totalPrice: req.body.totalPrice
  });

  res.status(201).json(order);
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
};
