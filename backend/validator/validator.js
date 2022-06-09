const joi = require("joi");

const signUpschemaVli = joi.object({
  fName: joi.string().required(),
  lName: joi.string().required(),
  email: joi.string().email().required().min(10),
  password: joi
    .string()
    .required()
    .pattern(/^[a-zA-Z0-9]{3,30}$/),
  confirmPassword: joi.ref("password"),
});

const signValidator = joi.object({
  email: joi.string().required().email(),
  password: joi
    .string()
    .required()
    .pattern(/^[a-zA-Z0-9]{3,30}$/),
});

module.exports = { signUpschemaVli, signValidator };
