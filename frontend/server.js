const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');

const express = require('express');
const socket = require('socket.io');

const config = require('../config/config');
const router = require('./router');
const emitter = require('./emitter');

const {logStatus} = require('../components/logger');


module.exports = () => {
  const app = express();
  const server = http.Server(app);
  const io = socket(server);

  app.use('/static', express.static(path.join(__dirname, '/static')));
  app.set('views', __dirname + '/templates');
  app.engine('html', require('ejs').renderFile);
  app.use(bodyParser.json());

  app.use(router);
  emitter(io);


  server.listen(config.port, function() {
    logStatus('Frontend server is running:');
    console.log('\x1b[1m\x1b[4m', 'http://localhost:' + config.port);
    console.log('\x1b[0m');
  });
};
