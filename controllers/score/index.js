const Class = require("../../database/models/Class");
const Score = require("../../database/models/Score");

const isTeacherAuthorisedForSubject = async (author, subject) => {
  return await Class.exists({
    author,
    subject,
  });
};

const isTeacherAuthorisedForScoreCard = async (author, score_card) => {
  try {
    const scoreCard = await Score.findById(score_card);
    return await Class.exists({
      author,
      subject: scoreCard.subject,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getScoreCardByStudent = async (req, res) => {
  const student_id = req.user;
  try {
    const scores = await Score.find(
      { student: student_id },
      { student: 0 }
    ).populate("subject");
    return res.status(200).json(scores);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getScoreCardByTeacher = async (req, res) => {
  const teacher_id = req.user;
  const { body } = req;
  try {
    const isAuthorisedForSection = await Class.findOne({
      _id: body.class_id,
      author: teacher_id,
    });
    const scoresBySection = await Score.find({
      subject: isAuthorisedForSection.subject,
    })
      .populate("student", { classes: 0, password: 0, role: 0 })
      .populate("subject", {classes:0});
    return res.status(200).json(scoresBySection);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addScoreCard = async (req, res) => {
  const { body } = req;
  const teacher_id = req.user;
  try {
    if (!isTeacherAuthorisedForSubject(teacher_id, body.subject_id))
      return res.status(406).json("unuathorised");
    const score = {
      student: body.student_id,
      subject: body.subject_id,
      score: body.score,
    };
    const addScore = await Score.create(score);
    return res.status(201).json(addScore);
  } catch (error) {
    return res.status(500).json(error);
  }
};


const updateScoreCardScore = async (req, res) => {
  const { body } = req;
  const teacher_id = req.user;
  try {
    if (!isTeacherAuthorisedForScoreCard(teacher_id, body.score_card_id))
      return res.status(406).json("unauthorised");
    const updatedScoreCardScore = {
      score: body.score,
      _id: body.score_card_id,
    };
    const updatedScoreCardScoreResponse = await Score.updateOne(
      updatedScoreCardScore
    );
    return res.status(201).json(updatedScoreCardScoreResponse);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteScoreCard = async (req, res) => {
  const { body } = req;
  const teacher_id = req.user;
  try {
    if (!isTeacherAuthorisedForScoreCard(teacher_id, body.score_card_id))
      return res.status(406).json("unuathorised");
    const deletedScoreScardResponse = await Score.findByIdAndDelete(
      body.score_card_id
    );
    return res.status(201).json(deletedScoreScardResponse);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getScoreCardByStudent,
  getScoreCardByTeacher,
  addScoreCard,
  updateScoreCardScore,
  deleteScoreCard,
};
