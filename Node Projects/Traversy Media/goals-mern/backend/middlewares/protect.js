const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const isToken = req.headers.authorization;

  if (!isToken || !isToken.startsWith('Bearer')) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const token = isToken.split(' ')[1];

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
