const fs = require('fs');

const stringify = require('javascript-stringify');
const stackTrace = require('stack-trace');

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

const logError = (text, obj = null) => {
  obj = !obj ? '' : stringify(obj);

  if (config.logging != 'silent') {
    console.error(text, obj);
  }

  const trace = stackTrace.get();

  const stack = trace.map(t => t.getFileName() + ' ' + t.getLineNumber()).join(', ');

  const message = `
    ${new Date()}: ${text}
    ${stack}
    ${obj}
    \n\n
  `;

  fs.appendFile(LogFile.ERROR, message, err => {
    if (err) console.error('Error appending to error file. Oh the irony!', err);
  });
};

const logInfo = (text, obj = null) => {
  obj = !obj ? '' : stringify(obj);

  if (config.logging == 'verbose' || config.logging == 'default') {
    console.log(text, obj);
  }

  const data = new Date() + ': ' + text + ' ' + obj;
  fs.appendFile(LogFile.INFO, '\n ' + data, err => {
    if (err) console.error('Error appending to info file.', err);
  });
};

const logStatus = (text, obj = null) => {
  obj = !obj ? '' : stringify(obj, null, ' ');

  console.log(text, obj);

  const data = new Date() + ': ' + text + ' ' + obj;
  fs.appendFile(LogFile.STATUS, '\n ' + data, err => {
    if (err) console.error('Error appending to status file.', err);
  });
};

module.exports = {
  logError,
  logInfo,
  logStatus,
}
