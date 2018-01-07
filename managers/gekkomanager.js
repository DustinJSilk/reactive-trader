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
      child({command: NODE, args: Options.IMPORT,
        cbStdout: data => console.log('out ' + data),
        cbStderr: data => console.log('err ' + data),
        cbClose: exitCode => {
          console.log('Import complete');
          resolve();
        },
      }).start();
    });
  }

  async runServer() {
    this.isStoppingGracefully = false;

    if (this.server != null) {
      await this.stopServer();
    }

    console.log('Running server');

    return new Promise((resolve, reject) => {
      this.server = child({command: NODE, args: Options.SERVER,
        cbStdout: data => {},
        cbStderr: data => console.log('err ' + data),
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

  runTrader() {
    console.log('Running trader');
    console.log('paperTrader: ', config.paperTrader);
    console.log('liveTrader: ', config.liveTrader);

    return new Promise((resolve, reject) => {
      this.trader = child({command: NODE, args: Options.TRADE,
        cbStdout: data => console.log('out ' + data),
        cbStderr: data => console.log('err ' + data)
      });

      this.trader.start();
    });
  }

  stopServer() {
    console.log('Stopping server');

    return new Promise((resolve, reject) => {
      if (this.server != null) {
        this.isStoppingGracefully = true;
        this.server.stop(resolve);
        this.server = null;
      } else {
        console.log('Stop failed: No server found');
        resolve();
      }
    });
  }
}

module.exports = GekkoManager;
