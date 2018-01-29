const fs = require('fs');

const moment = require('moment');

const config = require('../config/config');
const gekkoConfig = require('../../config');


const TEMP_CONFIG_LOCATION = __dirname + '/../config/tmp-config.js';

const Period = {
  DAYS: 'days',
  HOURS: 'hours',
};

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

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
      await this.removeOldConfig();

      let data = this.duplicateGekkoConfigObject();
      data = this.setPaperAndLiveTraders(data, config.paperTrader, config.liveTrader);
      data = this.addStrategy(data, strategy);
      data = this.addCurrencyAsset(data);
      data = await this.saveFile(data);

    } catch (err) {
      console.error(ErrorMessage.BUILDING_CONFIG, err)
    }
  }

  /**
   * Returns the config specifically for use with the api/backtest endpoint.
   */
  async getBacktestConfig(strategy, backtestRange) {
    try {
      let data = this.duplicateGekkoConfigObject();
      data = this.addStrategy(data, strategy);
      data = this.addBacktestDateRange(data, backtestRange);
      data = this.addCurrencyAsset(data);
      return data;

    } catch (err) {
      console.error(ErrorMessage.BUILDING_CONFIG, err)
    }
  }

  /**
   * Builds the config specifically for the inital config. (I think theres a
   * minimum of 1 day at least.)
   */
  async buildImportConfig(range) {
    console.log('Building import config');

    try {
      await this.removeOldConfig();
      let data = this.duplicateGekkoConfigObject();
      data = this.setPaperAndLiveTraders(data, false, false);
      data = this.addImportDateRange(data, range);
      data = this.addCurrencyAsset(data);

      data.tradingAdvisor.enabled = false;
      data.performanceAnalyzer.enabled = false;

      data = this.saveFile(data);

    } catch (err) {
      console.error(ErrorMessage.BUILDING_CONFIG, err)
    }
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
    data.watch = config.watch;
    return data;
  }

  setPaperAndLiveTraders(data, paper, live) {
    data.paperTrader.enabled = paper;
    data.trader.enabled = live;
    return data;
  }

  addStrategy(data, strategy) {
    data.tradingAdvisor.enabled = true;
    data.tradingAdvisor.method = strategy.slug;
    data.tradingAdvisor.candleSize = strategy.input.candleSize;
    data.tradingAdvisor.historySize = strategy.input.historySize;
    data[strategy.slug] = strategy.input;
    return data;
  }

  addImportDateRange(data, range) {
    data.importer = {
      daterange: this.getDateRange(range)
    };

    return data;
  }

  addBacktestDateRange(data, range) {
    data.backtest = {
      daterange: this.getDateRange(range)
    };

    return data;
  }

  getDateRange(range) {
    const from = range ? range.start : moment()
        .subtract(config.backtestRange, Period.DAYS);

    const to = range ? range.end : moment();

    return {
      from: from.format(DATE_FORMAT),
      to: to.format(DATE_FORMAT)
    }
  }
}

module.exports = ConfigBuilder;
