const logger = (req, res, next) => {
  console.log(req.method, req.url, new Date().getFullYear());
  next();
};

module.exports = logger;
