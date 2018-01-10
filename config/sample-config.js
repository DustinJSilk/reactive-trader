module.exports = {
  // The number of days to run the initial backtest on before starting
  backtestRange: 1,

  // The approximate number of candles between updating the strategy settings
  updateSettingsTime: 24,

  // The approximate number of candles between checking for a new best strategy
  updateStrategyTime: 48,

  paperTrader: true,

  liveTrader: false,

  // Some tests will trade only once yet still be the most profitable. That isnt
  // sustainable. This will filter out those invalid test settings
  minimumAllowedTrades: 4,

  // This should match the config in gekkos web/vue/UIconfig.js, making sure
  // that port is available.
  apiEndpoint: 'http://127.0.0.1:3000',

  // Port for the frontend to run on.
  port: 8080,

  // verbose, debug, silent
  logging: 'debug',

  watch: {
    exchange: 'poloniex',
    currency: 'BTC',
    asset: 'XEM',
  },

  genetic: {
    iterations: 10,
    size: 40,
    crossover: 0.9,
    mutation: 0.8,
    skip: 0,
    fittestAlwaysSurvives: true
  }
}
