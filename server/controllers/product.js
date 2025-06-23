import asyncHandler from "express-async-handler";
import Product from "../models/product.js";

const products = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

export {products};