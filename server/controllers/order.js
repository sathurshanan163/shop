import asyncHandler from 'express-async-handler';
import Order from '../models/order.js';

const create_order = asyncHandler(async (req, res) => {
  const { items, shipping_address, subtotal, tax, shipping, total } = req.body;

  if (items && items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const new_order = new Order({
      items,
      user: req.user._id,
      shipping_address,
      subtotal,
      tax,
      shipping,
      total,
    });
    const created_order = await new_order.save();
    res.status(201).json(created_order);
  }
});

const order_by_id = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export { create_order, order_by_id };
