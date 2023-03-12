const { isTokenValid } = require('../utils/jwt');
const CustomError = require('../errors');

const auth = (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError('Not authenticated');
  }

  try {
    const payload = isTokenValid({ token });
    req.user = {
      name: payload.name,
      role: payload.role,
      userId: payload.userId,
    };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Not authenticated');
  }
};

const authorize = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError('Not authorized');
    }
    next();
  };
};

module.exports = { auth, authorize };
