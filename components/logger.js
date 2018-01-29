const config = require('../config/config.js');

const logError = (text, obj = '') => {
  if (config.logger != 'silent') {
    console.error(text, obj);
  }
};

const log = (text, obj = '') => {
  if (config.logger == 'verbose') {
    console.log(text, obj);
  }
};

const logStatus = (text) => {
  console.log(text);
};

module.exports = {
  logError,
  log,
  logStatus
}
