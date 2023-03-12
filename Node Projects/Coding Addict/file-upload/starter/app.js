require('dotenv').config();
require('express-async-errors');
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const express = require('express');
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

// database
const connectDB = require('./db/connect');

app.use(express.static('public'));
app.use(express.json());
app.use(fileupload({ useTempFiles: true }));

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

app.use('/api/v1/products', require('./routes/productRoutes'));

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.DB_URL);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port} 🔥`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
