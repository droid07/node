const notFound = (req, res, next) => {
  res.status(400).json({ success: false, message: 'route does not exist' });
};

export default notFound;
