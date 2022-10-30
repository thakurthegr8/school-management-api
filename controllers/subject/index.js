const Subject = require("../../database/models/Subject");
const Class = require("../../database/models/Class");

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

const getSubjectByAdmin = async (req, res) => {
  try {
    const response = await Subject.find({}, { classes: 0 });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getSubjectByTeacher = async (req, res) => {
  const teacher_id = req.user;
  try {
    const response = await Class.find(
      { author: teacher_id },
      { classes: 0, students: 0, author: 0 }
    ).populate("subject", { classes: 0 });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getSubjectByStudent = async (req, res) => {
  const student_id = req.user;
  try {
    const response = await Class.find(
      { students: student_id },
      { classes: 0, students: 0, author: 0 }
    ).populate("subject", { classes: 0 });
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
    const response = await Subject.findByIdAndDelete(body.subject_id);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateSubjectName = async (req, res) => {
  if (req.body == null) return res.status(400).json("insert request body");
  const body = req.body;
  try {
    const response = await Subject.updateOne({
      _id: body.subject_id,
      name: body.subject_name,
    });
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateSubjectCode = async (req, res) => {
  if (req.body == null) return res.status(400).json("insert request body");
  const body = req.body;
  try {
    const response = await Subject.updateOne({ code: body.subject_code });
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};
module.exports = {
  addSubject,
  getSubjectByAdmin,
  getSubjectByTeacher,
  getSubjectByStudent,
  deleteSubject,
  updateSubjectName,
  updateSubjectCode,
};
