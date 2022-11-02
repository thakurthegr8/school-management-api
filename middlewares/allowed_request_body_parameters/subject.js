const Joi = require("joi");
const { isAdmin } = require("..");

const addSubjectBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    isAdmin(req, res, next);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateSubjectNameBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    subject_name: Joi.string().required(),
    subject_id: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    isAdmin(req, res, next);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateSubjectCodeBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    subject_code: Joi.string().required(),
    subject_id: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    isAdmin(req, res, next);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteSubjectBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    subject_id: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    isAdmin(req, res, next);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addSubjectBodySchema,
  updateSubjectNameBodySchema,
  updateSubjectCodeBodySchema,
  deleteSubjectBodySchema,
};
