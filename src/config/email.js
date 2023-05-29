const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.PASSPHRASE,
  },
});

// Send an email
const mailOptions = {
  from: process.env.FROM,
  to: process.env.TO,
  subject: process.env.SUBJECT,
};

const sendEmail = (property) => {
  let messageTemplate = process.env.TEXT;

  const message = messageTemplate
  .replace('${property.contactName}', property.contactName)
  .replace('${property.contactPhone}', property.contactPhone)
  .replace('${property.contactEmail}', property.contactEmail);



  mailOptions.html = message;
  console.log(message);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendEmail;
