const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const authMiddleware = async (req, res, next) => {
  const authHeder = req.headers.authorization;

  if (!authHeder || !authHeder.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided!', 401);
  }

  const token = authHeder.split(' ')[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decode;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError('Not authorized!', 401);
  }
};

module.exports = authMiddleware;
