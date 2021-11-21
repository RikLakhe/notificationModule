const path = require('path');
const logger = require('./logger');

// import .env variables
require('dotenv-safe').config({
  path: path.join(__dirname, '../../.env'),
  example: path.join(__dirname, '../../.env.example'),
});

const varConfig = require('../../configEnv.json');

for (let i = 0; i < varConfig.length; i += 1) {
  if (process.env[varConfig[i]] === undefined) {
    logger.error(`${varConfig[i]} is missing. Exiting app.`);
    process.exit(1);
  }
}

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  log:
    process.env.NODE_ENV === 'production'
      ? process.env.LOGGER === 'true'
      : true,
};
