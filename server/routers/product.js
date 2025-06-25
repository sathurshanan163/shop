import express from "express";
import {products, product} from "../controllers/product.js";

const router = express.Router();

router.route("/").get(products);
router.route("/:id").get(product);

export default router;