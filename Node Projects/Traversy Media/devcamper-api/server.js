const express = require('express');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars!
dotenv.config({ path: './config/config.env' });

// FILES!
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');
const { protect, authorize } = require('./middlewares/auth');
const notFound = require('./middlewares/notFound');

const app = express();

app.use(express.json());

app.use(fileupload());

app.use(mongoSanitize());

app.use(helmet());

app.use(xss());

const limiter = rateLimit({
  windowMs: 10 * 10 * 1000,
  max: 100,
});

app.use(limiter);

app.use(hpp());

app.use(cors());

app.use(cookieParser());

// ROUTES!
app.use('/api/bootcamps', bootcamps);
app.use('/api/courses', courses);
app.use('/api/auth', auth);
app.use('/api/users', protect, authorize('admin'), users);
app.use('/api/reviews', reviews);
app.use(errorHandler);

app.use(express.static('./public'));
app.use('*', notFound);

const PORT = process.env.PORT || 5000;

const start = () => {
  app.listen(PORT, () => {
    connectDB(process.env.DB_URL);
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT} 🔥`
    );
  });
};

// Handle promise rejections!
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});

start();
