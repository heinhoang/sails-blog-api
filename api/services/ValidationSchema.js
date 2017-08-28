const Joi = require('joi');

const strongRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})";
const mediumRegex = "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})";

module.exports = {
  register: {
    body: {
      firstName: Joi.string().alphanum().required(),
      lastName: Joi.string().alphanum().required(),
      email: Joi.string().email().required(),
      userName: Joi.string().alphanum().min(3).max(30).required() || Joi.string().email().required(),
      password: Joi.string().regex(new RegExp(`${strongRegex}|${mediumRegex}`)).required(),
    }
  }
};