const User = require('../models/User');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { attachCookieToRes } = require('../utils/jwt');
const createTokenUser = require('../utils/createTokenUser');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  // MAKE FIRST ACCOUNT HAS ADMIN
  const isFirstAccount = (await User.countDocuments({})) === 0;

  const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({ name, email, password, role });
  const tokenUser = createTokenUser(user);

  attachCookieToRes({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ success: true, user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.NotFoundError('Please Provide email id and password');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new CustomError.UnauthenticatedError('Invalid email or password');
  }

  const tokenUser = createTokenUser(user);

  attachCookieToRes({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ success: true, user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new CustomError.NotFoundError(
      'Please Provide old password and new password'
    );
  }

  const user = await User.findOne({ _id: req.user.userId });

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ success: true, msg: 'Password Updated' });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new CustomError.NotFoundError('Please Provide all values');
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name },
    {
      new: true,
      runValidators: true,
    }
  );

  const tokenUser = createTokenUser(user);
  attachCookieToRes({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ success: true, user: tokenUser });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ success: true, user: req.user });
};

const logout = async (req, res) => {
  res
    .cookie('token', null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .status(StatusCodes.OK)
    .json({ success: true });
};

module.exports = {
  login,
  register,
  updateUserPassword,
  updateUser,
  showCurrentUser,
  logout,
};
