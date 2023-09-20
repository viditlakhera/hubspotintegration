const configenv = require('config');
let appPort = configenv.get('app.port');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

const config = {
  env: configenv.util.getEnv('NODE_ENV'),
  port: appPort,
  sentry: configenv.get('sentry')
};

module.exports = config;
