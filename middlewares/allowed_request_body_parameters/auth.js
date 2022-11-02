const Joi = require("joi");

const signUpBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    gender: Joi.string().required(),
    age: Joi.number().required(),
    role: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

const loginBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAccessTokenBodySchema = async (req, res, next) => {
  const schema = new Joi.object({
    refresh_token: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  signUpBodySchema,
  loginBodySchema,
  getAccessTokenBodySchema,
};
