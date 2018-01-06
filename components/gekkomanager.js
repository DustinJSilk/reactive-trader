const {exec} = require('child_process');

const GEKKO = 'node ' + __dirname + '/../../gekko ';

const Options = {
  IMPORT: '--import --config=./reactive-trader/tmp-config.js'
};

class GekkoManager {
  constructor() {}

  importData(configFile) {
    return new Promise((resolve, reject) => {
      const cmd = GEKKO + Options.IMPORT;

      const importer = exec(cmd, (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);

        if (err !== null) reject(err);
      });

      importer.on('close', () => resolve());
    });
  }
}

module.exports = GekkoManager;
