import asyncHandler from 'express-async-handler';
import Order from '../models/order.js';
import Product from '../models/product.js';
import { calculate_prices } from '../utils/calculate_prices.js';

const create_order = asyncHandler(async (req, res) => {
  const { items, shipping_address, subtotal, tax, shipping, total } = req.body;

  if (items && items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const items_from_db = await Product.find({
      _id: { $in: items.map((x) => x._id) },
    });

    const db_order_items = items.map((item_from_client) => {
      const matching_item_from_db = items_from_db.find(
        (items_from_db) => items_from_db._id.toString() === item_from_client._id
      );
      return {
        ...item_from_client,
        product: item_from_client._id,
        price: matching_item_from_db.price,
        _id: undefined,
      };
    });
    const { subtotal, shipping, tax, total } = calculate_prices(db_order_items);
    const new_order = new Order({
      items: db_order_items,
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
