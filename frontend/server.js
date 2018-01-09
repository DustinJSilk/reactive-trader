const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');

const express = require('express');
const socket = require('socket.io');

const router = require('./router');
const emitter = require('./emitter');

const app = express();
const server = http.Server(app);
const io = socket(server);

const PORT = process.env.PORT || 8080;

app.use('/static', express.static(path.join(__dirname, '/static')));
app.set('views', __dirname + '/templates');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());

app.use(router);
emitter(io);


server.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});
