import 'dotenv/config';
import express from 'express';
import user_routes from './routes/user.js';
import product_routes from './routes/product.js';
import order_routes from './routes/order.js';
import connect_db from './config/db.js';
import { not_found, error_handler } from './middleware/error.js';
import stripe_route from './routes/stripe.js';

connect_db();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API...');
});
app.use('/api/users', user_routes);
app.use('/api/products', product_routes);
app.use('/api/orders', order_routes);
app.use('/api/stripe', stripe_route);

app.use(not_found);
app.use(error_handler);

app.listen(4000, console.log('Server running on port 4000'));
