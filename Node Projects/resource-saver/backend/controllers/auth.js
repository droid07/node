const User = require('../models/User');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const user = await User.create(req.body);

  const token = await user.generateToken();

  const oneDay = 1000 * 60 * 60 * 24;

  res
    .cookie('token', token, {
      expires: new Date(Date.now() + oneDay),
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    .status(200)
    .json({
      success: true,
      user: { _id: user._id, name: user.name, email: user.email },
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email or Password cannot be empty');
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('Email or Password is Wrong');
  }

  const matchPassword = await user.comparePassword(password);

  if (!matchPassword) {
    res.status(400);
    throw new Error('Email or Password is Wrong');
  }

  const token = await user.generateToken();

  const oneDay = 1000 * 60 * 60 * 24;

  res
    .cookie('token', token, {
      expires: new Date(Date.now() + oneDay),
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    .status(200)
    .json({
      success: true,
      user: { _id: user._id, name: user.name, email: user.email },
    });
};

const logout = (req, res) => {
  res
    .clearCookie('token', {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    .status(200)
    .json({
      success: true,
      message: 'User logged out',
    });
};

const getMe = async (req, res) => {
  const user = await User.findById(req.user).select('-password');
  res.status(200).json({ success: 'true', user });
};

module.exports = { register, login, logout, getMe };
