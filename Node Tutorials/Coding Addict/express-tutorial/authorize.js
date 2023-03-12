const authorize = (req, res, next) => {
  const { user } = req.query;

  if (user === 'lisa') {
    req.user = { name: 'lisa' };
    next();
  } else {
    return res.status(401).json({ success: 'false' });
  }
};

module.exports = authorize;
