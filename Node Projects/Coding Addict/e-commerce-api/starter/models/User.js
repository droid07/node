const mongoose = require('mongoose');
const validator = require('validator');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    minlength: 3,
    required: [true, 'Name field is required'],
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
    unique: true,
    required: [true, 'Email field is required'],
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Password field is required'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

// HASH PASSWORDS!
UserSchema.pre('save', async function () {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});

// COMPARE PASSWORDS!
UserSchema.methods.comparePassword = async function (password) {
  return await bycrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
