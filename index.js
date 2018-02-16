/**
 * Module dependencies.
 */
const app = require('express')();
const http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('App is running at http://localhost:3000');
  console.log('Press CTRL-C to stop\n');
});