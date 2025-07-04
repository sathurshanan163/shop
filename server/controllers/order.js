import asyncHandler from 'express-async-handler';
import Order from '../models/order.js';
import Product from '../models/product.js';
import { calculate_total } from '../utils/calculate_total.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET);

const create_order = asyncHandler(async (req, res) => {
  const { items, shipping_address } = req.body;

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
    const total = calculate_total(db_order_items);
    const new_order = new Order({
      items: db_order_items,
      user: req.user._id,
      shipping_address,
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

const my_orders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

const order_to_paid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.body.order_id);
  if (order) {
    const line_items = order.items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    }));
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: 'http://localhost:3000/',
        cancel_url: 'http://localhost:3000/profile',
      });
      order.is_paid = true;
      await order.save();
      res.send({ url: session.url });
    } catch (error) {
      res.status(500);
      throw new Error('Payment failed');
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export { create_order, order_by_id, my_orders, order_to_paid };
