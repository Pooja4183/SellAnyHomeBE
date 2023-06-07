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
};

const sendEmail = async(property) => {
  const subjectTemplate = process.env.SUBJECT_SELLER;
  const subject = subjectTemplate
    .replace("${property.contactName}", property.contactName);
  mailOptions.subject = subject;

  const messageTemplate = process.env.TEXT_SELLER;
  const message = messageTemplate
    .replace("${property.contactName}", property.contactName)
    .replace("${property.contactPhone}", property.contactPhone)
    .replace("${property.contactEmail}", property.contactEmail)
    .replace("${property.homeType}", property.homeType)
    .replace("${property.isBuy}", property.isBuy)
    .replace("${property.bed}", property.bed)
    .replace("${property.bath}", property.bath)
    .replace("${property.price}", property.price)
    .replace("${property.currency}", property.currency)
    .replace("${property.sqFt}", property.sqFt)
    .replace("${property.address}", property.address)
    .replace("${property.description}", property.description)
    .replace("${property.yearBuilt}", property.yearBuilt)
    .replace("${property.sellerType}", property.sellerType)
    .replace("${property.isListed}", property.isListed)
    .replace("${property.sellDuration}", property.sellDuration);

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

 const sendContactEmail = async(contact, property) => {
  const subjectTemplate = process.env.SUBJECT_BUYER;
  const subject = subjectTemplate
    .replace("${contact.buyerName}", contact.buyerName);
  mailOptions.subject = subject;

  const messageTemplate = process.env.TEXT_BUYER;
  const message = messageTemplate
    .replace("${contact.buyerName}", contact.buyerName)
    .replace("${contact.buyerPhone}", contact.buyerPhone)
    .replace("${contact.buyerEmail}", contact.buyerEmail)
    .replace("${property.homeType}", property.homeType)
    .replace("${property.bed}", property.bed)
    .replace("${property.bath}", property.bath)
    .replace("${property.price}", property.price)
    .replace("${property.currency}", property.currency)
    .replace("${property.sqFt}", property.sqFt)
    .replace("${property.address}", property.address)
    .replace("${property.description}", property.description)
    .replace("${property.yearBuilt}", property.yearBuilt)
    .replace("${property.sellerType}", property.sellerType)
    .replace("${property.isListed}", property.isListed);

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

module.exports = {sendEmail, sendContactEmail};
