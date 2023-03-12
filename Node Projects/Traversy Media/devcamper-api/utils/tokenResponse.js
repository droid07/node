const sendTokenResponse = (user, statusCode, res) => {
  const token = user.generateToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ sucess: true, token });
};

module.exports = sendTokenResponse;
