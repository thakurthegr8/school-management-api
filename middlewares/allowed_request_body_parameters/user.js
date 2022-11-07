const Joi = require("joi");
const { isAdmin } = require("..");

const getUserBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    _id: Joi.string(),
    role: Joi.string(),
    first_name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string(),
    gender: Joi.string(),
    role: Joi.string(),
  });
  try {
    await schema.validateAsync(req.query);
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addUserBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    gender: Joi.string().required(),
    age: Joi.number().required(),
    role: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    isAdmin(req, res, next);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteUserBodySchema = async (req, res, next) => {
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
const deleteUserBulkBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    id: Joi.array(),
  });
  try {
    await schema.validateAsync(req.body);
    isAdmin(req, res, next);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
  getUserBodySchema,
  addUserBodySchema,
  deleteUserBodySchema,
  deleteUserBulkBodySchema,
};
