const randomExt = require('random-ext');

/**
 * The closer you can get all these config settings to the best values the
 * quicker and more efficient your machine will run.
 * So try to keep your ranges small.
 *
 * You should also try keep the number of enabled strategies to a minimum.
 *
 * Candle size will need to be adjusted so that it works well with the backtest
 * time periods.
 */



// This shouldn't need to be mutated, just keep it at what you think is best.
// This is the history to the before trading begins.
const HISTORY_SIZE = 20;

const list = [
  {
    slug: 'MACD',
    enabled: false,
    input: () => ({
      candleSize: randomExt.integer(10, 1),
      historySize: HISTORY_SIZE,

      short: randomExt.integer(18, 2),
      long: randomExt.integer(32, 14),
      signal: randomExt.integer(16, 4),
      thresholds: {
        down: -0.00000025,
        up: 0.00000025,
        persistence: randomExt.integer(4, 0),
      }
    })
  },
  {
    slug: 'RSI',
    enabled: true,
    input: () => ({
      candleSize: randomExt.integer(10, 1),
      historySize: HISTORY_SIZE,

      interval: randomExt.integer(16, 4),
      thresholds: {
        low: randomExt.integer(40, 20),
        high: randomExt.integer(80, 60),
        persistence: randomExt.integer(2, 0),
      }
    })
  }
];

const getEnabled = () => {
  return list.filter(strategy => strategy.enabled);
};

const getNewStrategyInput = (slug) => {
  return listPointers[slug].input();
};

const listPointers = list.reduce((map, obj, index) => {
    map[obj.slug] = list[index];
    return map;
}, {});

module.exports = Object.assign({
  list,
  getEnabled,
  getNewStrategyInput
}, listPointers);
