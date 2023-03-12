const User = require('../model/User');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all the required fields');
  }

  const user = await User.create(req.body);

  const token = await user.generateToken();

  res.status(200).json({
    success: true,
    user: { _id: user._id, name: user.name, email: user.email, token },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please add all the required fields');
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('email or password is wrong');
  }

  const matchPassword = await user.comparePassword(password);

  if (!matchPassword) {
    res.status(400);
    throw new Error('email or password is wrong');
  }

  const token = await user.generateToken();

  res.status(200).json({
    success: true,
    user: { _id: user._id, name: user.name, email: user.email, token },
  });
};

const getMe = async (req, res) => {
  const user = await User.findById(req.user)
    .select('-password')
    .populate('goals');
  res.status(200).json({ success: user });
};

module.exports = { register, login, getMe };
