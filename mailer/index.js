const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: process.env.NODEMAILER_ID,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendMail = async (mailConfig) => {
  const customMailConfig = { ...mailConfig, from: process.env.NODEMAILER_PASS };
  try {
    const mail = await transporter.sendMail(customMailConfig);
    if (mail) {
      console.log(mail);
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = sendMail;
