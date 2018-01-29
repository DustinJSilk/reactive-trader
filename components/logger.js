const config = require('../config/config.js');

const logError = (text, obj = '') => {
  if (config.logging != 'silent') {
    console.error(text, obj);
  }
};

const log = (text, obj = '') => {
  if (config.logging == 'verbose' || config.logging == 'default') {
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
