const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: "thakurthegr8@outlook.com",
    pass: "Awskol7906#",
  },
});

const sendMail = async (mailConfig) => {
  const customMailConfig = { ...mailConfig, from: "thakurthegr8@outlook.com" };
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
