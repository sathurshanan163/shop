import 'dotenv/config';
import express from 'express';
import user_routes from './routers/user.js';
import product_routes from './routers/product.js';
import order_routes from './routers/order.js';
import connect_db from './config/db.js';
import { error_handler } from './middleware/error.js';
import stripe_route from './routers/stripe.js';
import Stripe from 'stripe';

connect_db();

const app = express();

const stripe = new Stripe(process.env.STRIPE_SECRET);
const endpoint_secret = process.env.STRIPE_ENDPOINT_SECRET;

app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      endpoint_secret
    );
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
    return;
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const payment_intent_succeeded = event.data.object;
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  response.send();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API...');
});
app.use('/api/users', user_routes);
app.use('/api/products', product_routes);
app.use('/api/orders', order_routes);
app.use('/api/stripe', stripe_route);

app.use(error_handler);

app.listen(4000, console.log('Server running on port 4000'));
