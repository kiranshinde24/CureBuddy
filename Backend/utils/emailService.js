// ✅ Load environment variables
require('dotenv').config();

const nodemailer = require('nodemailer');

// 🔍 Confirm values are loaded
console.log("📨 MAIL_USER:", process.env.MAIL_USER);
console.log("📨 MAIL_PASS:", process.env.MAIL_PASS);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent to', to);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
};

module.exports = { sendEmail };
