const EventEmitter = require('events');

const Genetic = require('genetic-js');
const randomExt = require('random-ext');

const Backtester = require('./backtester');
const ConfigBuilder = require('./configbuilder');
const GekkoManager = require('../managers/gekkomanager');
const config = require('../config/config');
const strategies = require('../config/strategies');

const EventType = {
  NEW_TEST_POPULATION: 'new-test-population'
};

class StrategyFinder extends EventEmitter {
  constructor() {
    super();

    this.gekkoManager = GekkoManager.getInstance();
    this.backtester = new Backtester();
    this.configBuilder = new ConfigBuilder();

    this.backtestRange = null;
  }

  static getInstance() {
    if (!this.instance_) {
      this.instance_ = new StrategyFinder();
    }

    return this.instance_;
  }

  async findNewStrategy() {
    this.backtestRange = null
    return await this.testAllStrategies();
  }

  async findStrategyBetween(start, end) {
    this.backtestRange = {start, end};
    return await this.testAllStrategies();
  }

  async testAllStrategies() {
    const reducerStart = {fitness: {profit: -99999}};
    const enabledStrategies = strategies.getEnabled();
    const testResults = [];

    for (let i = 0; i < enabledStrategies.length; i++) {
      const strategy = enabledStrategies[i];
      const result = await this.testStrategy(strategy.slug);
      testResults.push(result);
    }

    return testResults.reduce((accum, curr) => {
      return curr[0].fitness.profit > accum.fitness.profit ? curr[0] : accum;
    }, reducerStart);
  }

  async testStrategy(slug) {
    console.log('Testing ' + slug);

    const genetic = Genetic.create();
    genetic.optimize = this.optimize;
    genetic.select1 = Genetic.Select1.Fittest;
    genetic.select2 = Genetic.Select2.FittestRandom;
    genetic.seed = this.seed.bind(this, slug);
    genetic.mutate = this.mutate.bind(this);
    genetic.crossover = this.crossover.bind(this);
    genetic.fitness = this.fitness.bind(this);
    genetic.generation = this.generation.bind(this);

    let results = []

    const promise = new Promise((resolve, reject) => {
      genetic.notification = (pop, generation, stats, isFinished) => {
        results.push(...pop);

        console.log(pop.map(p => p.fitness.relativeYearlyProfit).join('    '));

        this.emit(EventType.NEW_TEST_POPULATION, pop[0].slug, pop);

        if (isFinished && generation == config.genetic.iterations) {
          results.sort((a, b) => this.optimize(a.fitness, b.fitness));
          results.reverse();
          resolve(results);
        };
      };
    });

    await genetic.evolve(config.genetic);

    return promise;
  }

  /**
   * Set to false to complete
   */
  generation(pop, generation, stats) {
  	return generation < config.genetic.iterations;
  };

  optimize(a, b) {
    // If they both are above / below minimumAllowedTrades then order by profit,
    // otherwise the one that is above the minimumAllowedTrades comes first.
    if (a.trades >= config.minimumAllowedTrades &&
        b.trades >= config.minimumAllowedTrades ||
        a.trades < config.minimumAllowedTrades &&
        b.trades < config.minimumAllowedTrades ) {
      return a.profit >= b.profit;

    } else {
      return a.trades >= b.trades;
    }
  }

  async fitness(entity) {
    const backtestConfig = await this.configBuilder.getBacktestConfig(entity,
        this.backtestRange);
    const result = await this.backtester.run(backtestConfig);
    result.profit = parseFloat(result.profit);
    result.relativeYearlyProfit = parseFloat(result.relativeYearlyProfit);
    return result;
  }

  crossover(mother, father) {
    const son = this.clone(father);
    const daughter = this.clone(mother);

    const len = Object.keys(mother).length;
    const crossPoint = randomExt.integer(len - 1, 1);
    let currPoint = 0;

    for (let i in mother) {
      if (mother.hasOwnProperty(i) && father.hasOwnProperty(i)) {

        if (currPoint >= crossPoint) {
          // Cross over nested objects.
          if (typeof mother[i] == 'object' && typeof father[i] == 'object') {
            const childObject = this.crossover(mother[i], father[i]);
            son[i] = childObject[0];
            daughter[i] = childObject[1];

          } else {
            son[i] = mother[i];
            daughter[i] = father[i];
          }
        }
      }

      currPoint++;
    }

    return [son, daughter];
  }

  mutate(entity) {
    const keys = Object.keys(entity.input);
    const mutateIndex = randomExt.integer(keys.length - 1, 0);
    const newInput = strategies.getNewStrategyInput(entity.slug);
    const target = keys[mutateIndex];

    // Nested object, ugh, i know.
    if (typeof entity.input[target] == 'object') {
      const keysB = Object.keys(entity.input[target]);
      const mutateIndexB = randomExt.integer(keysB.length - 1, 0);
      const targetB = keysB[mutateIndexB];

      entity.input[target][targetB] = newInput[target][targetB];

    } else {
      entity.input[target] = newInput[target];
    }

    return entity;
  }

  seed(slug) {
    return {
      slug: slug,
      input: strategies.getNewStrategyInput(slug),
    };
  }

  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}

module.exports = {
  EventType,
  StrategyFinder
};
