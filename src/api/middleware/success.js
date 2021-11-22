const httpStatus = require('http-status');
const { log } = require('../../config/vars');
const logger = require('../../config/logger');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (req, res, next) => {
  const response = {
    code: 200,
    message: res.locals.message || httpStatus[200],
    data: res.locals.data || res.locals.message,
    timeStamp: new Date().toISOString(),
  };

  if (log) {
    logger.info(response);
  }

  res.status(200).json(response);
};

exports.handler = handler;
