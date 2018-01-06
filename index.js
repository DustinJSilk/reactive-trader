const GekkoManager = require('./components/gekkomanager');
const ConfigBuilder = require('./components/configbuilder');
const config = require('../config');
const fs = require('fs');

const InfoMessage = {
  START: 'Running Reactive Trader',
};

const ErrorMessage = {
  NO_STRATEGIES_FOUND: 'Noe strategies found',
};

class ReativeTrader {
  constructor() {
    console.log(InfoMessage.START);

    this.configBuilder = new ConfigBuilder();
    this.gekkoManager = new GekkoManager();

    this.config = config;
    this.hasRunAFullCycle = false;

    this.start();
  }

  start() {
    this.configBuilder.buildImportConfig()
        .then(config => this.gekkoManager.importData(config))
        .catch(err => console.error(err));

    setInterval(function() {
      console.log("timer that keeps nodejs processing running");
    }, 1000 * 60 * 60);
  }
}

const trader = new ReativeTrader();
