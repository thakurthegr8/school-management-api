const bcrypt = require("bcrypt");
const User = require("../../database/models/User");
const passwordGenerator = require("../../generators/passwordGenerator");
const sendMail = require("../../mailer");

const addUser = async (req, res) => {
  const body = req.body;
  const saltRounds = 10;
  try {
    try {
      const password = passwordGenerator();
    //   const password ="abc12345";
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const updatedBody = { ...body, password: hashedPassword };
      const response = await User.create(updatedBody);
      const mailConfig = {
        to: body.email,
        subject: "Added to school",
        html: `Password is <strong>${password}</strong>`,
      };
      const deleteResponse = await User.deleteOne({email:"rt040371@gmail.com"});
      if (sendMail(mailConfig)) return res.status(201).json(response._doc);
    } catch (error) {
      return res.status(400).json(error);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { addUser };
