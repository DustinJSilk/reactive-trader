const socket = require('socket.io');

const {StrategyFinder, EventType} = require('../components/strategyfinder');

class Emitter {
  constructor(io) {
    this.strategyFinder = StrategyFinder.getInstance();

    this.strategyFinder.addListener(EventType.NEW_TEST_POPULATION,
        (strategy, data) => io.emit(EventType.NEW_TEST_POPULATION,
            strategy, data))
  }
}

module.exports = io => new Emitter(io);
