const {exec} = require('child_process');

const child = require('child')

const GEKKO = __dirname + '/../../gekko';
const NODE = 'node';

const Options = {
  IMPORT: [GEKKO, '--import', '--config=./reactive-trader/tmp-config.js'],
  RUN: [GEKKO, '--config=./reactive-trader/tmp-config.js']
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
      this.server = child({command: NODE, args: Options.IMPORT,
        cbStdout: data => console.log('out ' + data),
        cbStderr: data => console.log('err ' + data),
        cbClose: exitCode => {
          console.log('Import complete');
          this.stopServer().then(resolve);
        },
      });

      this.server.start();
    });
  }

  async runServer() {
    if (this.server != null) {
      await this.stopServer();
    }

    console.log('Running server');

    return new Promise((resolve, reject) => {
      this.server = child({command: NODE, args: Options.RUN,
        cbStdout: data => console.log('out ' + data),
        cbStderr: data => console.log('err ' + data),
        cbClose: exitCode => {
          console.log('Server quit unexpectedly', exitCode)
          this.stopServer().then(() => reject(exitCode));
        },
      });

      this.server.start();

      // How do we know its up and running successfully? I don't know yet so
      // we'll just wait a bit and then resolve.
      setTimeout(() => resolve, 2000);
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

  isRunning() {
    return !!this.server;
  }
}

module.exports = GekkoManager;
