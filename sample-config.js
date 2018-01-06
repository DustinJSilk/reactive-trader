module.exports = {
  /**
   * The strategies to check.
   * 'all' / ['MACD', 'RSI', ...]
   * Using 'all' will take considerable time and processing power. I recommend
   * using a desktop or selecting a few strategies only unless of course you
   * have a large and powerful server available.
   */
  strategies: 'all',

  // The number of hours to run the initial backtest on before starting
  backtestRange: 2,

  // The approximate number of candles between updating the strategy settings
  updateSettingsTime: 24,

  // The approximate number of candles between checking for a new best strategy
  updateStrategyTime: 48,

  paperTrader: true,

  liveTrader: false,

  // This should match the config in gekkos web/vue/UIconfig.js, making sure
  // that port is available.
  apiEndpoint: 'http://127.0.0.1:3000',

  gekko: {
    watch: {
      exchange: 'poloniex',
      currency: 'BTC',
      asset: 'XEM',
    },

    tradingAdvisor: {
      enabled: false,
      candleSize: 1,
      historySize: 3,
      adapter: 'sqlite'
    }
  }
}
