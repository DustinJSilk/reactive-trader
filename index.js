const fs = require('fs');

const ConfigBuilder = require('./components/configbuilder');
const GekkoManager = require('./managers/gekkomanager');
const config = require('./config/config');
const {StrategyFinder} = require('./components/strategyfinder');

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
    this.strategyFinder = StrategyFinder.getInstance();

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
    if (config.paperTrader || config.liveTrader) {
      const tradeType = config.paperTrader ? 'paper' : 'live';
      console.log(`About to start ${tradeType} trading.`);
      console.log(`I've commented it out for now though.`);
    } else {
      console.log('You need to enable live or paper trading.');
    }
    // await this.configBuilder.buildStrategyConfig(strategy);
    // console.log('Running strategy: ', strategy.slug);
    // this.gekkoManager.runTrader();
  }

  keepRunning() {
    setInterval(() => {}, 3600000);
  }
}

const trader = new ReativeTrader();
