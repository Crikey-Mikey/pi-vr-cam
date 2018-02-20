const http    = require('http');
const express = require('express');

const WebStreamerServer = require('./lib/server.js');

const app  = express();

app.use(express.static(__dirname + '/public'));

const server  = http.createServer(app);
const silence = new WebStreamerServer(server);

server.listen(8080, function(){
  console.log('App is running at http://[IP]:8080');
  console.log('Press CTRL-C to stop\n');
});