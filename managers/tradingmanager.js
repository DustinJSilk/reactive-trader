const fs = require('fs');

const ConfigBuilder = require('../components/configbuilder');
const GekkoManager = require('./gekkomanager');
const config = require('../config/config');
const {StrategyFinder} = require('../components/strategyfinder');

const InfoMessage = {
  START: 'Running Reactive Trader',
};

const ErrorMessage = {
  NO_STRATEGIES_FOUND: 'No strategies found',
};

class TradingManager {
  constructor() {
    this.gekkoManager = GekkoManager.getInstance();
    this.configBuilder = new ConfigBuilder();
    this.strategyFinder = StrategyFinder.getInstance();

    if (this.configBuilder.isValid()) {
      this.start();
    } else {
      throw new Error(WARNING_CONFIG_ERROR);
    }
  }

  static getInstance() {
    if (!this.instance_) {
      this.instance_ = new TradingManager();
    }

    return this.instance_;
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
}

module.exports = () => TradingManager.getInstance();
