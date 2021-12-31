const Joi = require("joi");
const authSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),

  access_token: [Joi.string(), Joi.number()],
});
module.exports = {
  authSchema,
};
