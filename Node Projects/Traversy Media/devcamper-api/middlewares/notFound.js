const notFound = (req, res, next) => {
  res
    .status(404)
    .json({ success: false, msg: 'The particular route does not exist' });
};

module.exports = notFound;
