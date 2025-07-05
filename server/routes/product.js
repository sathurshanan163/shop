import express from 'express';
import { products, product } from '../controllers/product.js';
import object_id from '../middleware/object_id.js';

const router = express.Router();

router.get('/', products);
router.get('/:id', object_id, product);

export default router;
