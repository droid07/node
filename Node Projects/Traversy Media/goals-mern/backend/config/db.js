const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect(process.env.DB_URL, () =>
    console.log('DB Connected ⚡'.magenta)
  );
};

module.exports = connectDB;
