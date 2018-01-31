const socket = require('socket.io');

const {StrategyFinder, EventType} = require('../components/strategyfinder');

class Emitter {
  constructor(io) {
    this.strategyFinder = StrategyFinder.getInstance();

    this.strategyFinder.addListener(EventType.NEW_TEST_POPULATION,
        data => io.emit(EventType.NEW_TEST_POPULATION, data))
  }
}

module.exports = io => new Emitter(io);
