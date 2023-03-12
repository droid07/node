const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401);
    throw new Error('User not authorized');
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user.userId;
    next();
  } catch (error) {
    res.status(401);
    throw new Error('User not authorized');
  }
};

module.exports = protect;
