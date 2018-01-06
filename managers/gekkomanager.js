const {exec} = require('child_process');

const child = require('child')

const GEKKO = __dirname + '/../../gekko';

const GEKKO_API = __dirname + '/../../web/server';

const NODE = 'node';

const Options = {
  IMPORT: [GEKKO, '--import', '--config=./reactive-trader/tmp-config.js'],
  RUN: [GEKKO_API, '--config=./reactive-trader/tmp-config.js']
};

class GekkoManager {
  constructor() {
    this.server = null;
  }

  static getInstance() {
    if (!this.instance_) {
      this.instance_ = new GekkoManager();
    }

    return this.instance_;
  }

  async importData() {
    if (this.server != null) {
      await this.stopServer();
    }

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
      this.server = child({command: NODE, args: Options.RUN,
        cbStdout: data => console.log('out ' + data),
        cbStderr: data => console.log('err ' + data),
        cbClose: exitCode => {
          if (!this.isStoppingGracefully) {
            console.log('Server quit unexpectedly', exitCode)
            this.stopServer().then(() => reject(exitCode));
          }
        },
      });

      this.server.start(resolve);
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

  isRunning() {
    return !!this.server;
  }
}

module.exports = GekkoManager;
