import User from '../models/User.js';

const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');

  res.status(200).json({ success: true, users });
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ success: true, message: 'User deleted' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    return res.status(200).json({ success: true, user });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin;

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    user: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    },
  });
};

export { getAllUsers, deleteUser, getUser, updateUser };
