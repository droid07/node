const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const notFound = require('./middleware/notfound');
const connectDB = require('./db/connect');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/tasks', tasks);
app.use('*', notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server started at port ${PORT} 🔥`));
  } catch (error) {
    console.log(error);
  }
};

start();
