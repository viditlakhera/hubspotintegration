const configenv = require('config');
// require and configure dotenv, will load vars in .env in PROCESS.ENV
// let appPort = configenv.get('app.port');

require('dotenv').config();

// define validation for all the env vars

const config = {
  env: configenv.util.getEnv('NODE_ENV'),
  port: 3999,
};

module.exports = config;
