const notFound = (req, res, next) => {
  res.status(404).send('Not found');
  next();
};

module.exports = notFound;
