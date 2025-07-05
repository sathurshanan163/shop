import express from 'express';
import { create_order, order_by_id, my_orders } from '../controllers/order.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, create_order);
router.get('/mine', auth, my_orders);
router.get('/:id', auth, order_by_id);

export default router;
