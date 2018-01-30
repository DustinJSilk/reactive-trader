const program = require('commander');

const gekkoConfig = require('../config');

const backtestManager = require('./managers/backtestmanager');
const server = require('./frontend/server');
const tradingManager = require('./managers/tradingmanager');
const {logError} = require('./components/logger');

program
    .version('0.1.0')
    .option('-u, --ui', 'Launch the frontend UI (coming soon)')
    .option('-r, --run', 'Run the GA tests and then start trading')
    .option('-b, --backtest', 'Backtest the whole bot on auto pilot')
    .option('-day, --days <n>', 'Number of days to run the backtest on', parseInt)
    .parse(process.argv);

// Check node version
if (parseFloat(process.versions.node) < 8.9) {
  return logError('Please update your node version.');
}

if (!gekkoConfig) {
  return logError('You need to finish setting up Gekko correctly. You haven\'t even added the config.js file.');
}

if (program.ui) {
  server();
}

if (program.run) {
  tradingManager();
  keepRunning();

} else if (program.backtest) {
  const days = program.days || 3;
  backtestManager(days);
}

function keepRunning() {
  setInterval(() => {}, 3600000);
};
