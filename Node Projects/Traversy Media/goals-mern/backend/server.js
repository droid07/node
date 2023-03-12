const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
require('colors');
require('express-async-errors');

connectDB();

const app = express();

const handleError = require('./middlewares/handleError');
const notFound = require('./middlewares/notFound');
const goals = require('./routes/goals');
const auth = require('./routes/auth');

app.use(express.json());
app.use(cors());

app.use('/api/goals', goals);
app.use('/api/auth', auth);

app.use(notFound);
app.use(handleError);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening in port ${PORT} 🔥`.cyan));
