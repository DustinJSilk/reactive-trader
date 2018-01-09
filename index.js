const program = require('commander');

const server = require('./frontend/server');
const tradingManager = require('./managers/tradingmanager');

program
    .version('0.1.0')
    .option('-u, --ui', 'Launch the frontend UI')
    .option('-r, --run', 'Run the GA tests and then start trading')
    .option('-t, --test', 'Backtest the strategies')
    .option('-b, --backtest', 'Backtest the whole bot on auto pilot')
    .parse(process.argv);

if (program.ui) {
  server();
}

if (program.run) {
  tradingManager();
  keepRunning();
}

function keepRunning() {
  setInterval(() => {}, 3600000);
};
