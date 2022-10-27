const Subject = require("../../database/models/Subject");

const addSubject = async (req, res) => {
  if (req.body == null) return res.status(400).json("insert request body");
  const body = req.body;
  try {
    const response = await Subject.create(body);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getSubject = async (req, res) => {
  try {
    // if (query) {
    //   const response = await Subject.find(query)
    //     .populate("students")
    //     .populate("author");
    //   return res.status(200).json(response);
    // }
    const response = await Subject.find().populate('classes');
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const deleteSubject = async (req, res) => {
  if (req.body == null) return res.status(400).json("insert request body");
  const body = req.body;
  try {
    const response = await Subject.findByIdAndDelete(body.id);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateSubject = async (req, res) => {
  if (req.body == null) return res.status(400).json("insert request body");
  const body = req.body;
  try {
    const response = await Subject.updateOne(body);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { addSubject, getSubject, deleteSubject, updateSubject };
