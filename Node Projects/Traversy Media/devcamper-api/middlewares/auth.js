const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('./async');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return next(new ErrorResponse('User not authorized', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(userData.id);
    next();
  } catch (error) {
    return next(new ErrorResponse('User not authorized', 401));
  }
});

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(`User role ${req.user.role} not authorized`, 403)
      );
    }
    next();
  };
};

module.exports = { protect, authorize };
