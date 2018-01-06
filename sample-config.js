module.exports = {
  /**
   * The strategies to check
   * 'all' / ['MACD', 'RSI', ...]
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

  gekko: {
    watch: {
      exchange: 'poloniex',
      currency: 'BTC',
      asset: 'XEM',
    },

    tradingAdvisor: {
      enabled: true,
      method: 'MACD',
      candleSize: 1,
      historySize: 3,
      adapter: 'sqlite'
    }
  }
}
