const Backtester = require('./backtester');
const ConfigBuilder = require('./configbuilder');

const GekkoManager = require('../managers/gekkomanager');


class StrategyFinder {
  constructor() {
    this.gekkoManager = GekkoManager.getInstance();
    this.backtester = new Backtester();
    this.configBuilder = new ConfigBuilder();
  }

  async findNewStrategy() {
    console.log('Finding strategy');

    if (!this.gekkoManager.isRunning()) {
      await this.configBuilder.buildImportConfig();
      await this.gekkoManager.importData();
      await this.gekkoManager.runServer();
    }

    const strategy =  await this.testAllStrategies();
    console.log('Found strategy: ', strategy.slug);

    this.gekkoManager.stopServer();

    return strategy;
  }

  async testAllStrategies() {
    // TODO: It will return the one with the best yearly profit. For now we
    // return a test.
    console.log('Testing all strats');
    return await this.testStrategy();
  }

  async testStrategy() {
    console.log('Testing single strategy: void');

    return new Promise(resolve => {
      resolve({
        slug: 'stochastic',
        optInFastK_Period: 5,
        optInSlowK_Period: 3,
        optInSlowK_MAType: 0,
        optInSlowD_Period: 3,
        optInSlowD_MAType: 0,
      });
    });
  }
}

module.exports = StrategyFinder;
