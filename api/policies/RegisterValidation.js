const validate = require('express-validation');
const vSchema = require('../services/ValidationSchema');

module.exports = (req, res, next) => {
    validate(vSchema.register);
    next();
};