const express = require('express');
require('dotenv').config();
require('express-async-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
// const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const fileupload = require('express-fileupload');
const app = express();

const connectDB = require('./config/db');
const connectCloudinary = require('./config/cloudinary');
const errorMiddleware = require('./middlewares/errorMiddleware');
const notFound = require('./middlewares/notFound');
const auth = require('./routes/auth');
const resources = require('./routes/resources');
const notes = require('./routes/notes');

connectDB();

app.use(express.json());

app.use(cookieParser());

connectCloudinary();

// File uploading
app.use(fileupload({ useTempFiles: true }));

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
// app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(
  cors({
    // origin: process.env.FRONTEND_URL,
    origin: 'http://127.0.0.1:5173',
    credentials: true,
  })
);

app.use('/api/auth', auth);
app.use('/api/resources', resources);
app.use('/api/notes', notes);

app.get('/', (req, res) => res.send('<h1>Running...</h1>'));

app.use(notFound);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT} 🔥`));
