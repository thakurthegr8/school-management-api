const Class = require("../../database/models/Class");
const Subject = require("../../database/models/Subject");
const User = require("../../database/models/User");

const addClass = async (req, res) => {
  if (req.body == null) return res.status(400).json("insert request body");
  const body = req.body;
  try {
    const addClassResponse = await Class.create(body);
    const addClassToSubjectResponse = await Subject.updateOne(
      { _id: body.subject },
      { $push: { classes: addClassResponse._id } }
    );
    const addClassToTeacherResponse = await User.updateOne(
      { _id: body.author },
      { $push: { classes: addClassResponse._id } }
    );

    if (
      addClassResponse &&
      addClassToSubjectResponse &&
      addClassToTeacherResponse
    )
      return res.status(201).json(addClassResponse);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getClass = async (req, res) => {
  console.log(req.user, req.role);
  const query = req.query;
  try {
    if (query) {
      const response = await Class.find(query)
        .populate("students")
        .populate("author");
      return res.status(200).json(response);
    }
    const response = await Class.find()
      .populate("students")
      .populate("author")
      .populate("subject");
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteClass = async (req, res) => {
  if (req.body == null) return res.status(400).json("insert request body");
  const body = req.body;
  try {
    const response = await Class.findByIdAndDelete(body.id);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateClass = async (req, res) => {
  if (req.body == null) return res.status(400).json("insert request body");
  const body = req.body;
  try {
    const response = await Class.updateOne(body);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const addStudentInClass = async (req, res) => {
  if (req.body == null) return res.status(400).json("insert request body");
  const body = req.body;
  try {
    const addStudentResponse = await Class.updateOne(
      { _id: body.class_id },
      { $push: { students: body.student_id } }
    );
    const addClassResponse = await User.updateOne(
      { _id: body.student_id },
      { $push: { classes: body.class_id } }
    );
    if (addClassResponse && addStudentResponse)
      return res.status(201).json(addStudentResponse);
  } catch (error) {
    return res.status(400).json(error);
  }
};
const addTeacherInClass = async (req, res) => {
  if (req.body == null) return res.status(400).json("insert request body");
  const body = req.body;
  try {
    const addTeacherResponse = await Class.updateOne(
      { _id: body.class_id },
      { $push: { students: body.student_id } }
    );
    const addClassResponse = await User.updateOne(
      { _id: body.student_id },
      { $push: { classes: body.class_id } }
    );
    if (addClassResponse && addStudentResponse)
      return res.status(201).json(addStudentResponse);
  } catch (error) {
    return res.status(400).json(error);
  }
};
module.exports = {
  addClass,
  getClass,
  deleteClass,
  updateClass,
  addStudentInClass,
  addTeacherInClass,
};
