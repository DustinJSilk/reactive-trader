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

  async start() {
    await this.gekkoManager.runServer();
    const strategy = await this.strategyFinder.findNewStrategy();
    this.runStrategy(strategy);
  }

  async runStrategy(strategy) {
    await this.configBuilder.buildStrategyConfig(strategy);
    console.log('Running strategy: ', strategy.slug);
    this.gekkoManager.runTrader();
  }

  keepRunning() {
    setInterval(() => {}, 3600000);
  }
}

const trader = new ReativeTrader();
