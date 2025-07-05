import express from 'express';
import { order_to_paid } from '../controllers/order.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create-checkout-session', auth, order_to_paid);

export default router;
