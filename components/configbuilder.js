const fs = require('fs');

const moment = require('moment');

const config = require('../config');
const gekkoConfig = require('../gekko-config');


const TEMP_CONFIG_LOCATION = __dirname + '/../tmp-config.js';

const Period = {
  DAYS: 'days',
  HOURS: 'hours',
};

const DATE_FORMAT = 'YYYY-MM-DD hh:mm';

const ErrorMessage = {
  BUILDING_CONFIG: 'Something went wrong building the configuration file:\n',
  PAPER_AND_LIVE_TRADE: 'Paper trading & live trading set.'
};

class ConfigBuilder {
  constructor() {}

  isValid() {
    if (config.paperTrader && config.liveTrader) {
      console.log('Live trade or paper trade. Not both!');
      return false;
    }

    return true;
  }

  /**
   * Builds the config specifically for running a strtegy
   */
  async buildStrategyConfig(strategy) {
    console.log('Building strategy config');

    try {
      let data = {};
      await this.removeOldConfig();
      data = this.duplicateGekkoConfigObject();
      data = this.addStrategy(data, strategy);
      data = this.addBacktestDateRange(data);
      data = this.addCurrencyAsset(data);
      data = await this.saveFile(data);

    } catch (err) {
      console.error(ErrorMessage.BUILDING_CONFIG, err)
    }
  }

  /**
   * Builds the config specifically for the initial backtest.
   * TODO: Switch to async
   */
  buildBacktestConfig() {
    console.log('Building backtesting config');

    return this.removeOldConfig()
        .then(() => this.duplicateGekkoConfigObject())
        .then(data => this.addBacktestDateRange(data))
        .then(data => this.addCurrencyAsset(data))
        .then(data => this.saveFile(data))
        .catch(err => console.error(ErrorMessage.BUILDING_CONFIG, err))
  }

  /**
   * Builds the config specifically for the inital config. (I think theres a
   * minimum of 1 day at least.)
   * TODO: Switch to async
   */
  buildImportConfig() {
    console.log('Building import config');

    return this.removeOldConfig()
        .then(() => this.duplicateGekkoConfigObject())
        .then(data => this.addImportDateRange(data))
        .then(data => this.addCurrencyAsset(data))
        .then(data => this.saveFile(data))
        .catch(err => console.error(ErrorMessage.BUILDING_CONFIG, err))
  }

  saveFile(data) {
    return new Promise((resolve, reject) => {
      const module = `module.exports = ${JSON.stringify(data)}`;
      fs.writeFile(TEMP_CONFIG_LOCATION, module, 'utf8', (err) => {
        if (err) return reject(err);
        resolve(TEMP_CONFIG_LOCATION);
      });
    });
  }

  removeOldConfig() {
    return new Promise(resolve =>
      fs.unlink(TEMP_CONFIG_LOCATION, err => resolve()));
  }

  duplicateGekkoConfigObject() {
    return JSON.parse(JSON.stringify(gekkoConfig));
  }

  addCurrencyAsset(data) {
    data.watch = config.gekko.watch;
    return data;
  }

  addStrategy(data, strategy) {
    data.tradingAdvisor = config.gekko.tradingAdvisor;
    data.tradingAdvisor.method = strategy;
    data[strategy.slud] = data.strategy;
    return data;
  }

  addImportDateRange(data) {
    data.importer = {};
    data.importer.daterange = {
      from: moment().subtract(config.backtestRange, Period.HOURS)
          .format(DATE_FORMAT),
      to: moment().format(DATE_FORMAT)
    };

    return data;
  }

  addBacktestDateRange(data) {
    data.importer = {};
    data.importer.daterange = {
      from: moment().subtract(config.backtestRange, Period.HOURS)
          .format(DATE_FORMAT),
      to: moment().format(DATE_FORMAT)
    };

    return data;
  }
}

module.exports = ConfigBuilder;
