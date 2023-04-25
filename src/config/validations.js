const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");

const authDTO = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
});