const Backtester = require('./backtester');
const ConfigBuilder = require('./configbuilder');
const GekkoManager = require('../managers/gekkomanager');
const config = require('../config/config');
const strategies = require('../config/strategies');

class StrategyFinder {
  constructor() {
    this.gekkoManager = GekkoManager.getInstance();
    this.backtester = new Backtester();
    this.configBuilder = new ConfigBuilder();
  }

  async findNewStrategy() {
    console.log('Finding strategy');

    await this.configBuilder.buildImportConfig();
    await this.gekkoManager.importData();

    const strategy =  await this.testAllStrategies();
    console.log('Top performing strategy: ', strategy);

    return strategy;
  }

  async testAllStrategies() {
    const reducerStart = {test: {profit: -99999}};
    const enabledStrategies = strategies.filter(strategy => strategy.enabled);

    return await enabledStrategies.reduce(async (prevPromise, strategy) => {
      const result = await this.testStrategy(strategy);
      const best = await prevPromise;

      return result.test.profit > best.test.profit ? result : best;
    }, Promise.resolve(reducerStart));
  }

  async testStrategy(strategy) {
    console.log('Testing ' + strategy.slug);
    const settings = this.getStrategySettings(strategy);
    const backtestConfig = await this.configBuilder.getBacktestConfig(settings,
        config.backtestRange);
    const test = await this.backtester.run(backtestConfig);
    return Object.assign(settings, {test});;
  }

  getStrategySettings(strategy) {
    const data = {
      slug: strategy.slug,
      input: strategy.input(),
    };
    data.input.candleSize = 30;
    data.input.historySize = 20;
    return data;
  }
}

module.exports = StrategyFinder;
