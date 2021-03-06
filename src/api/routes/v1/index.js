const express = require("express");
const success = require("../../middleware/success");
const validation = require("../../middleware/validation");
const sendMail = require("../../../core/mail");
const sendPushNotification = require("../../../core/push");
const { bodyManipulation } = require("../../../core/commonUtils");

const router = express.Router();

/**
 * GET v1/status
 */
router.get(
  "/status",
  (req, res, next) => {
    res.locals = {
      code: 200,
      data: "OK",
      message: "Success",
    };
    next();
  },
  success.handler
);

router.post(
  "/mail",
  validation.sendMailValidation,
  (req, res, next) => {
    const { service, username, password, from, to, subject, text, keyValue } =
      req.body;

    sendMail({
      service,
      username,
      password,
      from,
      to,
      subject,
      text: bodyManipulation(text, keyValue),
    })
      .then((mailResponse) => {
        if (mailResponse.messageId) {
          res.locals = {
            code: 200,
            data: mailResponse,
            message: `Mail sent successfully to ${to}`,
          };
          next();
        }

        next(new Error("Mail not sent"));
      })
      .catch((err) => {
        next(err);
      });
  },
  success.handler
);

router.post(
  "/push",
  validation.sendPushNotificationValidation,
  (req, res, next) => {
    const { registrationToken, message, title } = req.body;

    sendPushNotification({
      registrationToken,
      message,
      title,
    })
      .then((pushResponse) => {
        console.log('pushResponse',pushResponse)
        // if (mailResponse.messageId) {
        //   res.locals = {
        //     code: 200,
        //     data: mailResponse,
        //     message: `Mail sent successfully to ${to}`,
        //   };
          next();
        // }

        // next(new Error("Mail not sent"));
      })
      .catch((err) => {
        next(err);
      });
  }
);

module.exports = router;
