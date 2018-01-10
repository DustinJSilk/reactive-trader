const {exec} = require('child_process');

const child = require('child');

const config = require('../config/config.js');

const GEKKO = __dirname + '/../../gekko';
const GEKKO_API = __dirname + '/../../web/server';
const NODE = 'node';
const CONFIG_ARG = '--config=./reactive-trader/config/tmp-config.js';

const Options = {
  IMPORT: [GEKKO, '--import', CONFIG_ARG],
  SERVER: [GEKKO_API, CONFIG_ARG],
  TRADE: [GEKKO, CONFIG_ARG]
};

class GekkoManager {
  constructor() {
    this.server = null;
    this.trader = null;
  }

  static getInstance() {
    if (!this.instance_) {
      this.instance_ = new GekkoManager();
    }

    return this.instance_;
  }

  async importData() {
    console.log('Importing data');

    return new Promise((resolve, reject) => {
      const importer = child({command: NODE, args: Options.IMPORT,
        cbStdout: data => {
          console.log('' + data);
          if (data.indexOf('Done importing!') >= 0) {
            importer.stop();
            resolve();
          }
        },
        cbStderr: data => console.log('' + data),
        cbClose: exitCode => {
          resolve();
        },
      });

      importer.start();
    });
  }

  async runServer() {
    if (this.server != null) {
      await this.stopServer();
    }

    console.log('Running server');

    return new Promise((resolve, reject) => {
      this.server = child({command: NODE, args: Options.SERVER,
        cbStdout: data => {},
        cbStderr: data => console.log('' + data),
        cbClose: exitCode => {
          console.log('Server quit unexpectedly', exitCode)
          this.stopServer().then(() => reject(exitCode));
        },
      });

      this.server.start();

      // TODO: Check stdout for when its up and running properly
      setTimeout(resolve, 4000);
    });
  }

  stopServer() {
    console.log('Stopping server');

    return new Promise((resolve, reject) => {
      if (this.server != null) {
        this.server.stop(resolve);
        this.server = null;
      } else {
        console.log('Stop failed: No server found');
        resolve();
      }
    });
  }

  async runTrader() {
    if (this.trader) {
      await this.stopTrader();
    }
    return new Promise((resolve, reject) => {
      this.trader = child({command: NODE, args: Options.TRADE,
        cbStdout: data => console.log('out ' + data),
        cbStderr: data => console.log('err ' + data)
      });

      this.trader.start();

      // TODO: Check stdout for when its up and running properly
      setTimeout(resolve, 4000);
    });
  }

  stopTrader() {
    console.log('Stopping trader');

    return new Promise((resolve, reject) => {
      if (this.trader != null) {
        this.trader.stop(resolve);
        this.trader = null;
      } else {
        console.log('Stop failed: No trader found');
        resolve();
      }
    });
  }
}

module.exports = GekkoManager;
