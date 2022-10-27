const Class = require("../../database/models/Class");

const addClass = async (req, res) => {
  if (req.body == null) return res.status(400).json("insert request body");
  const body = req.body;
  try {
    const response = await Class.create(body);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(201).json(error);
  }
};

const getClass = async (req, res) => {
    try {
      const response = await Class.find().populate('students');
      return res.status(200).json(response);
    } catch (error) {
      return res.status(201).json(error);
    }
  };
  
module.exports = { addClass, getClass };
