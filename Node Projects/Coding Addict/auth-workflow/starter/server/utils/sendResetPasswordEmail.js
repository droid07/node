const sendEmail = require('./sendEmail');

const sendResetPasswordEmail = async ({
  name,
  email,
  passwordToken,
  origin,
}) => {
  const resetURL = `${origin}/user/reset-password?token=${passwordToken}&email=${email}`;

  const message = `<p>You are receving this email because you (or someone else) has requested the reset of a password: 
  <a href="${resetURL}">Reset Password</a> </p>`;

  return sendEmail({
    to: email,
    subject: 'Password Reset',
    html: `<h4> Hello, ${name}</h4>
    ${message}
    `,
  });
};

module.exports = sendResetPasswordEmail;
