const Joi = require("@hapi/joi");

module.exports = {
  // POST /api/v1/mail
  mailSchema: Joi.object({
    service: Joi.string().required(),
    username: Joi.string().required().email(),
    password: Joi.string().required(),
    from: Joi.string().required(),
    to: Joi.any().required(),
    subject: Joi.string().required(),
    text: Joi.string().required(),
    keyValue: Joi.object().pattern(/.*/, [Joi.string()]).required(),
  }),
  pushSchema: Joi.object({
    registrationToken: Joi.string().required(),
    message: Joi.string().required(),
    title: Joi.string().required(),
  })
};
