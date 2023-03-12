const nodemailer = require('nodemailer');
const config = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
  let transporter = nodemailer.createTransport(config);

  return transporter.sendMail({
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
