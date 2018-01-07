const moment = require('moment');
const requestPromise = require('request-promise');

const config = require('../config/config');

const POST_OPTIONS = {
  method: 'POST',
  uri: config.apiEndpoint + '/api/backtest',
  body: {},
  json: true
};

const BASE_CONFIG = {
  gekkoConfig: {},
  data: {
    candleProps: ['close', 'start'],
    indicatorResults: false,
    report: true,
    roundtrips: false,
    trades: false
  }
};

class Backtester {
  constructor() {}

  async run(backtestConfig) {
    const body = this.clone(BASE_CONFIG);
    body.gekkoConfig = backtestConfig;

    const options = Object.assign(POST_OPTIONS, {body});

    try {
      const {report} = await requestPromise(options);
      return report;
    } catch (err) {
      console.log('Backtest failed: ', err);
    }
  }

  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}

module.exports = Backtester;
