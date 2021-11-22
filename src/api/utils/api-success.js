const httpStatus = require('http-status');

/**
 * Creates an API error.
 * @param {string} message - Error message.
 * @param {number} status - HTTP status code of error.
 * @param {boolean} isPublic - Whether the message should be visible to user or not.
 *
 */
class APISuccess {
  constructor({
    message, data,
  }) {
    this.name = this.constructor.name;
    this.message = message || 'API Success';
    this.data = data;
    this.code = httpStatus.OK;
  }
}

module.exports = APISuccess;
