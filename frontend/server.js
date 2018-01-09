const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');

const express = require('express');
const socket = require('socket.io');

const config = require('../config/config');
const router = require('./router');
const emitter = require('./emitter');


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
    console.log('Listening on port ' + config.port);
  });
};
