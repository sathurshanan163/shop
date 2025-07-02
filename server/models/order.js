import mongoose from 'mongoose';

const order_schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    shipping_address: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      post_code: { type: String, required: true },
      country: { type: String, required: true },
    },
    payment: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    total: {
      type: Number,
      default: 0.0,
      required: true,
    },
    is_paid: {
      type: Boolean,
      default: false,
      required: true,
    },
    is_delivered: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', order_schema);

export default Order;
