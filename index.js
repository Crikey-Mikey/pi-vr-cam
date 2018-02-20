/**
 * Module dependencies.
 */
const http    = require('http');
const express = require('express');

// var io = require('socket.io')(http);

const app  = express();

app.use(express.static('public'));

const server = http.createServer(app);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

server.listen(3000, function(){
  console.log('App is running at http://localhost:3000');
  console.log('Press CTRL-C to stop\n');
});