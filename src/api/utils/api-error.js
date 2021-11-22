const httpStatus = require('http-status');

/**
 * Creates an API error.
 * @param {string} message - Error message.
 * @param {number} status - HTTP status code of error.
 * @param {boolean} isPublic - Whether the message should be visible to user or not.
 *
 * @extends Error
 */
class APIError extends Error {
  constructor({
    message, errors, status, isPublic, stack,
  }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message || 'Internal Server Error';
    this.errors = errors;
    this.code = status || httpStatus.INTERNAL_SERVER_ERROR;
    this.isPublic = isPublic || false;
    this.stack = stack || new Error(message).stack;
  }
}

module.exports = APIError;
