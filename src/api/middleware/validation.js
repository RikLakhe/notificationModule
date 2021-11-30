const Joi = require("@hapi/joi");
const validate = require("../utils/validate");
const { mailSchema, pushSchema } = require("../../core/validations/send.validation");

/**
 * Validate the send mail request body
 * @public
 */
const sendMailValidation = (req, res, next) => {
  return validate(req.body, mailSchema)
    .then(() => next())
    .catch(next);
};

/**
 * Validate the send mail request body
 * @public
 */
 const sendPushNotificationValidation = (req, res, next) => {
  return validate(req.body, pushSchema)
    .then(() => next())
    .catch(next);
};

module.exports = {
  sendMailValidation,
  sendPushNotificationValidation
};
