import express from "express";
import {products} from "../controllers/product.js";

const router = express.Router();

router.route("/").get(products);

export default router;