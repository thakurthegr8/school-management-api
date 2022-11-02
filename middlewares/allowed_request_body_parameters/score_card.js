const Joi = require("joi");
const { isTeacher } = require("..");

const getSubjectByTeacherBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    class_id: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    isTeacher(req, res, next);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addScoreCardBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    subject_id: Joi.string().required(),
    student_id: Joi.string().required(),
    score: Joi.number().min(0).max(100).required(),
  });
  try {
    await schema.validateAsync(req.body);
    isTeacher(req, res, next);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateScoreCardScoreBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    score: Joi.number().required(),
    score_card_id: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    isTeacher(req, res, next);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteScoreCardBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    score_card_id: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    isTeacher(req, res, next);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getSubjectByTeacherBodySchema,
  addScoreCardBodySchema,
  updateScoreCardScoreBodySchema,
  deleteScoreCardBodySchema,
};
