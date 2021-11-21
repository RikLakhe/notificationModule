const httpStatus = require('http-status');
const APIError = require('../utils/api-error');
const { env, log } = require('../../config/vars');
const logger = require('../../config/logger');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  if (env !== 'development') {
    delete response.stack;
  }

  if (log) {
    logger.error(response);
  }

  res.status(err.status);
  res.json(response);
};

exports.handler = handler;

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
