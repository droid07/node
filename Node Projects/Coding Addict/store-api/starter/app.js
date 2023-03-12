require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const products = require('./routes/products');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.use('/api/products', products);
app.use('*', notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(PORT, () => console.log(`server started at ${PORT} 🔥`));
  } catch (error) {
    console.log(error);
  }
};

start();
