const Joi = require("joi");
const { isAdmin } = require("..");

const addClassBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    subject: Joi.string().required(),
    author: Joi.string().required(),
    students: Joi.array().required(),
    section: Joi.string().length(1).uppercase().required(),
  });
  try {
    await schema.validateAsync(req.body);
    isAdmin(req, res, next);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addStudentInClassBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    student_id: Joi.string().required(),
    class_id: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    isAdmin(req, res, next);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteStudentInClassBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    student_id: Joi.string().required(),
    class_id: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    isAdmin(req, res, next);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateTeacherInClassBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    teacher_id: Joi.string().required(),
    class_id: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    isAdmin(req, res, next);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteClassBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    id: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    isAdmin(req, res, next);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addClassBodySchema,
  addStudentInClassBodySchema,
  deleteStudentInClassBodySchema,
  updateTeacherInClassBodySchema,
  deleteClassBodySchema,
};
