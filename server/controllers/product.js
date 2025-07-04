import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';

const products = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const product = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { products, product };
