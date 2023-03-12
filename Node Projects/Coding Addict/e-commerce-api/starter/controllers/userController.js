const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json({ success: true, users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id, role: 'user' }).select(
    '-password'
  );

  if (!user) {
    throw new CustomError.NotFoundError('No user found');
  }

  res.status(StatusCodes.OK).json({ success: true, user });
};

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).json({ success: true, user });
};

const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ success: true, user });
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new CustomError.UnauthenticatedError('User not found');
  }

  await user.delete();

  res.status(StatusCodes.OK).json({ success: true, msg: 'user deleted' });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
};
