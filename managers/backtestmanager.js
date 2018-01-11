/**
 * @fileoverview
 *
 * How the backtest loop works:
 *
 * Find strategy on date 1
 * Run strategy on date 2 and save profit
 *
 * Find strategy on date 2
 * Run strategy on date 3 and save profit
 *
 * Find strategy on date 3
 * Run strategy on date 4 and save profit
 *
 * ...
 */
const moment = require('moment');

const Backtester = require('../components/backtester');
const ConfigBuilder = require('../components/configbuilder');
const GekkoManager = require('./gekkomanager');
const config = require('../config/config');
const {StrategyFinder} = require('../components/strategyfinder');

const Period = {
  DAYS: 'days',
  HOURS: 'hours',
};

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class BacktestManager {
  constructor(days) {
    this.backtester = new Backtester();
    this.configBuilder = new ConfigBuilder();
    this.gekkoManager = GekkoManager.getInstance();
    this.strategyFinder = new StrategyFinder();

    this.startTime = moment().subtract(parseInt(days + 1), Period.DAYS);
    this.results = [];

    const importRange = {
      start: this.startTime,
      end: moment()
    };
    this.run(importRange);
  }

  async run(importRange) {
    await this.gekkoManager.runServer();
    await this.configBuilder.buildImportConfig(importRange);
    await this.gekkoManager.importData();
    await this.startBacktestLoop();

    const results = this.getResults();
    console.log(results);
    console.log('------------------------------');
    console.log('Results after each period');
    console.log(this.results);
  }

  async startBacktestLoop() {
    let lastPeriodEnd = moment(this.startTime);

    while (true) {
      // Find strategy for first period
      const newPeriodEnd = moment(lastPeriodEnd).add(config.backtestRange, Period.DAYS);
      const strategy = await this.strategyFinder.findStrategyBetween(
          lastPeriodEnd, newPeriodEnd);

      // Find profits with strategy for second period
      const profitPeriodEnd = moment(newPeriodEnd).add(config.backtestRange, Period.DAYS);
      const range = {start: newPeriodEnd, end: profitPeriodEnd};
      const backtestConfig = await this.configBuilder.getBacktestConfig(
          strategy.entity, range);
      const test = await this.backtester.run(backtestConfig);

      // Store results
      this.results.push(test);
      console.log('Period done');
      // Move to next period
      lastPeriodEnd = moment(newPeriodEnd);

      const nextNewPeriodEnd = moment(lastPeriodEnd).add(config.backtestRange,
          Period.DAYS).add(1, Period.HOURS);
      if (moment().diff(nextNewPeriodEnd) < 0) {
        console.log('breaking');
        break;
      }
    }
  }

  getResults() {
    const results = this.results.reduce((accum, curr) => {
      accum.profit += curr.profit;
      accum.relativeProfit += curr.relativeProfit;
      accum.trades += curr.trades;
      return accum;
    }, {
      profit: 0,
      relativeProfit: 0,
      trades: 0,
    });

    results.balance = this.results[this.results.length - 1]['balance'];
    results.startBalance = this.results[0]['startBalance'];
    results.strategyUpdates = this.results.length;

    return results;
  }
}

module.exports = (days) => new BacktestManager(days);
