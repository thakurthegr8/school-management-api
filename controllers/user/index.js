const bcrypt = require("bcrypt");
const User = require("../../database/models/User");
const passwordGenerator = require("../../generators/passwordGenerator");
const sendMail = require("../../mailer");
const mailTemplates = require("../../mailer/templates");

const getUser = async (req, res) => {
  const query = req.query;
  try {
    if (query) {
      const users = await User.find(query, { password: 0, classes: 0 });
      return res.status(200).json(users);
    }
    const users = await User.find({}, { password: 0, classes: 0 });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
};

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
        html: mailTemplates.addUser({ email: body.email, password }),
      };
      if (sendMail(mailConfig)) return res.status(201).json(response._doc);
    } catch (error) {
      return res.status(400).json(error);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteUser = async (req, res) => {
  const body = req.body;
  try {
    try {
      const deleteResponse = await User.findByIdAndDelete(body.id);
      const mailConfig = {
        to: deleteResponse.email,
        subject: "Removed from school",
        html: "<h1>You've have been removed from school management</h1>",
      };
      if (sendMail(mailConfig))
        return res.status(201).json(deleteResponse._doc);
    } catch (error) {
      return res.status(400).json(error);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};
module.exports = { addUser, deleteUser, getUser };
