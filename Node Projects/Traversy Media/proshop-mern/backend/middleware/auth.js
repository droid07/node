import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = (req, res, next) => {
  const checkToken = req.headers.authorization;

  if (!checkToken) {
    return res
      .status(401)
      .json({ success: false, message: 'User not authorized' });
  }

  const token = checkToken.split(' ')[1];

  try {
    const { user } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    throw new Error('User not authorized');
  }
};

const protect = async (req, res, next) => {
  const user = await User.findById(req.user);

  if (req.user && user.isAdmin === 'true') {
    next();
  } else {
    res.status(401);
    throw new Error('User not authorized');
  }
};

export { auth, protect };
