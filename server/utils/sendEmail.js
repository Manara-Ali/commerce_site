const nodemailer = require("nodemailer");

const sendEmail = async (emailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Manara Ali <manaraali22@gmail.com>",
    to: emailOptions.email,
    subject: emailOptions.subject,
    text: emailOptions.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;