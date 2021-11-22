require('dotenv').config();
const logger = require('./logger');

const varConfig = require('../../config.json');

for (let i = 0; i < varConfig.length; i += 1) {
  if (process.env[varConfig[i]] === undefined) {
    logger.error(`${varConfig[i]} is missing. Exiting app.`);
    process.exit(1);
  }

  logger.info(`${varConfig[i]} is ${process.env[varConfig[i]]}, CHECKED`);
}

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  log: process.env.is_debug,
  mailhost: process.env.MAIL_HOST,
  mailuser: process.env.MAIL_USERNAME,
  mailpass: process.env.MAIL_PASSWORD,
};
