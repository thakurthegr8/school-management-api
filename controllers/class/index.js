const Class = require("../../database/models/Class");
const Subject = require("../../database/models/Subject");
const User = require("../../database/models/User");
const {
  getClassByStudentOuterFields,
  getClassByStudentAuthorFields,
  getClassByStudentSubjectFields,
} = require("../../utils/allowed_response_body_fields/class");

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
    //map class to each student
    await body.students.forEach(async (element) => {
      await User.updateOne(
        { _id: element },
        { $push: { classes: addClassResponse._id } }
      );
    });

    if (
      addClassResponse &&
      addClassToSubjectResponse &&
      addClassToTeacherResponse
    )
      return res.status(201).json(addClassResponse);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getClass = async (req, res) => {
  const query = req.query;
  try {
    if (query) {
      const response = await Class.find(query)
        .populate("author")
        .populate("subject");
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
const getClassByTeacher = async (req, res) => {
  const author = req.user;
  try {
    const response = await Class.find(
      { author },
      { author: 0, students: 1 }
    ).populate(["students", "author", "subject"]);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getClassByStudent = async (req, res) => {
  const _id = req.user;
  try {
    const classIds = await User.findById(_id, { classes: 1, _id: 0 });
    const classes = await Class.find(
      { _id: classIds.classes },
      getClassByStudentOuterFields
    )
      .populate("subject", getClassByStudentSubjectFields)
      .populate("author", getClassByStudentAuthorFields);
    return res.status(200).json(classes);
  } catch (error) {
    console.log(error);
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

const deleteStudentInClass = async (req, res) => {
  if (req.body == null) return res.status(400).json("insert request body");
  const body = req.body;
  try {
    const deleteStudentResponse = await Class.updateOne(
      { _id: body.class_id },
      { $pullAll: { students: [body.student_id] } }
    );
    const deleteClassResponse = await User.updateOne(
      { _id: body.student_id },
      { $pullAll: { classes: [body.class_id] } }
    );
    if (deleteStudentResponse && deleteClassResponse)
      return res.status(201).json(deleteStudentResponse);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateTeacherInClass = async (req, res) => {
  if (req.body == null) return res.status(400).json("insert request body");
  const body = req.body;
  try {
    const updateTeacherResponse = await Class.updateOne({
      _id: body.class_id,
      author: body.teacher_id,
    });
    const updateClassToExistingTeacherResponse = await User.updateOne(
      {
        _id: body.teacher_id,
      },
      { $pullAll: { classes: [body.class_id] } }
    );
    const updateClassToNewTeacherResponse = await User.updateOne(
      {
        _id: body.teacher_id,
      },
      { $push: { classes: body.class_id } }
    );
    if (
      updateTeacherResponse &&
      updateClassToExistingTeacherResponse &&
      updateClassToNewTeacherResponse
    ) {
      return res.status(201).json(updateClassToNewTeacherResponse);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  addClass,
  getClass,
  getClassByTeacher,
  getClassByStudent,
  deleteClass,
  updateClass,
  addStudentInClass,
  updateTeacherInClass,
  deleteStudentInClass,
};
