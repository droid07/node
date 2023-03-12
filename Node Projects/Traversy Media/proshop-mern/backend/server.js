import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import expressAsyncErrors from 'express-async-errors';

import connectDB from './config/db.js';
import notFound from './middleware/notFound.js';
import error from './middleware/error.js';
import products from './routes/products.js';
import auth from './routes/auth.js';
import order from './routes/order.js';
import user from './routes/users.js';

dotenv.config();

connectDB();

const app = express();

// Middlewares
app.use(express.json());

// ROUTES
app.use('/api/products', products);
app.use('/api/auth', auth);
app.use('/api/orders', order);
app.use('/api/users', user);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use('*', notFound);
app.use(error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} 🔥`.magenta
      .bold
  )
);
