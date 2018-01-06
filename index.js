const fs = require('fs');

const ConfigBuilder = require('./components/configbuilder');
const GekkoManager = require('./managers/gekkomanager');
const StrategyFinder = require('./components/strategyfinder');

const InfoMessage = {
  START: 'Running Reactive Trader',
};

const ErrorMessage = {
  NO_STRATEGIES_FOUND: 'No strategies found',
};

class ReativeTrader {
  constructor() {
    this.gekkoManager = GekkoManager.getInstance();
    this.configBuilder = new ConfigBuilder();
    this.strategyFinder = new StrategyFinder();

    if (this.configBuilder.isValid()) {
      this.start();
      this.keepRunning();
    } else {
      throw new Error(WARNING_CONFIG_ERROR);
    }
  }

  start() {
    this.strategyFinder.findNewStrategy()
        .then(strategy => this.runStrategy(strategy))
        .catch(err => console.error('Error running: ', err));
  }

  async runStrategy(strategy) {
    await this.configBuilder.buildStrategyConfig(strategy);

    console.log('Running strategy: ', strategy.slug);

    // TODO: build plugin to switch strategies.
    if (this.gekkoManager.isRunning()) {
      console.log('Server already running.');
    } else {
      console.log('Start up the server now');
    }
  }

  keepRunning() {
    setInterval(() => {}, 3600000);
  }
}

const trader = new ReativeTrader();
