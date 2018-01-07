module.exports = [
  {
    slug: 'MACD',
    enabled: true,
    input: () => ({
      short: 10,
      long: 21,
      signal: 9,
      thresholds: {
        down: -0.025,
        up: 0.025,
        persistence: 1,
      }
    })

  }, {
    slug: 'RSI',
    enabled: true,
    input: () => ({
      interval: 14,
      thresholds: {
        low: 30,
        high: 70,
        persistence: 1,
      }
    })
  }
];
