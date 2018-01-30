const fs = require('fs');

const config = require('../config/config');

/**
 * Just creating a new file for each session. Ordered by time.
 */
const FILE_IDS = Date.now();

const LOGS = __dirname + '/../logs';

const LogFile = {
  ERROR: LOGS + '/' + FILE_IDS + '-error',
  INFO: LOGS + '/' + FILE_IDS + '-info',
  STATUS: LOGS + '/' + FILE_IDS + '-status'
};

if (!fs.existsSync(LOGS)){
  fs.mkdirSync(LOGS);
}

fs.writeFile(LogFile.ERROR, '', { flag: 'wx' }, err => {});
fs.writeFile(LogFile.INFO, '', { flag: 'wx' }, err => {});
fs.writeFile(LogFile.STATUS, '', { flag: 'wx' }, err => {});

const logError = (text, obj = '') => {
  if (config.logging != 'silent') {
    console.error(text, obj);
  }

  const data = new Date() + ': ' + text + ' ' + obj;
  fs.appendFile(LogFile.ERROR, '\n ' + data, err => {
    if (err) console.error('Error appending to error file. Oh the irony!', err);
  });
};

const logInfo = (text, obj = '') => {
  if (config.logging == 'verbose' || config.logging == 'default') {
    console.log(text, obj);
  }

  const data = new Date() + ': ' + text + ' ' + obj;
  fs.appendFile(LogFile.INFO, '\n ' + data, err => {
    if (err) console.error('Error appending to info file.', err);
  });
};

const logStatus = (text) => {
  console.log(text);

  const data = new Date() + ': ' + text;
  fs.appendFile(LogFile.STATUS, '\n ' + data, err => {
    if (err) console.error('Error appending to status file.', err);
  });
};

module.exports = {
  logError,
  logInfo,
  logStatus,
}
