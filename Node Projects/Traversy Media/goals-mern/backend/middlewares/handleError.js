const handleError = (err, req, res, next) => {
  console.log(`${err.message}`.red);
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({ success: false, message: err.message });
  next();
};

module.exports = handleError;
