const nodemailer = require("nodemailer");

const sendEmail = async function (
  subject,
  message,
  send_to,
  sent_from,
  reply_to
) {
  if (process.env.NODE_ENV === "production") {
    const transporter = nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });

    const options = {
      from: sent_from,
      to: send_to,
      replyTo: reply_to,
      subject,
      html: message,
    };

    // Send email
    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.error(err);
      } else {
        console.error(info);
      }
    });
  } else {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const options = {
      from: sent_from,
      to: send_to,
      replyTo: reply_to,
      subject,
      html: message,
    };

    // Send email
    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.error(err);
      } else {
        console.error(info);
      }
    });
  }
};

module.exports = sendEmail;
