import express from 'express';
import { products, product } from '../controllers/product.js';
import object_id from '../middleware/object_id.js';

const router = express.Router();

router.route('/').get(products);
router.route('/:id').get(object_id, product);

export default router;
