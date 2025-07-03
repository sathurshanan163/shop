import express from 'express';
import {
  create_order,
  order_by_id,
  my_orders,
} from '../controllers/order.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(auth, create_order);
router.route('/mine').get(auth, my_orders);
router.route('/:id').get(auth, order_by_id);

export default router;
