const fs = require('fs');

const schedule = require('node-schedule');

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

    try {
      // Make sure we have enough backtest data before starting
      await this.configBuilder.buildImportConfig();
      await this.gekkoManager.importData();
    } catch (err) {
      return console.error('Uh oh, importing failed!', err);
    }

    // Now start the strategy loop
    this.updateStrategy();
  }

  async updateStrategy() {
    try {
      // Set new strategy
      var strategy = await this.strategyFinder.findNewStrategy();
      await this.runStrategy(strategy.entity);

    } catch (err) {
      return console.error('Error finding new strategy: ', err);
    }

    this.scheduleUpdate(strategy);
  }

  scheduleUpdate(strategy) {
    const updateInterval = config.updateSettingsTime;
    const candleSize = strategy.entity.input.candleSize;
    const interval = updateInterval * candleSize * 1000 * 60;
    const fireAt = new Date(Date.now() + interval);

    schedule.scheduleJob(fireAt, () => this.updateStrategy());
    console.log('The next update will happen at ' + fireAt);
  }

  async runStrategy(strategy) {
    if (config.paperTrader || config.liveTrader) {
      const tradeType = config.paperTrader ? 'paper' : 'live';
      console.log(`About to start ${tradeType} trading.`);

    } else {
      console.log('You need to enable live or paper trading.');
      return;
    }

    try {
      console.log('Running strategy: ', strategy);
      await this.configBuilder.buildStrategyConfig(strategy);
      await this.gekkoManager.runTrader();

    } catch (err) {
      console.error('Error starting to trade: ', err);
    }
  }
}

module.exports = () => TradingManager.getInstance();
