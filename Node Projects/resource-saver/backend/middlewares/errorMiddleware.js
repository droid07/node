const errorMiddleware = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({ success: false, message: error.message });
};

module.exports = errorMiddleware;
