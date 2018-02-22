"use strict";

// forked from https://github.com/131/h264-live-player

const WebSocketServer = require('ws').Server;
const Splitter        = require('stream-split');
const merge           = require('mout/object/merge');
const util            = require('util');
const spawn           = require('child_process').spawn;

const NALseparator    = new Buffer([0,0,0,1]);//NAL break

class _Server {

  constructor(server, options) {

    this.options = merge({
        width : 960,
        height: 540,
        fps : 12
    }, options);

    this.wss = new WebSocketServer({ server });

    this.new_client = this.new_client.bind(this);
    this.start_feed = this.start_feed.bind(this);
    this.broadcast  = this.broadcast.bind(this);

    this.wss.on('connection', this.new_client);
  }
  

  start_feed() {
    var readStream = this.get_feed();
    this.readStream = readStream;

    readStream = readStream.stdout.pipe(new Splitter(NALseparator));
    readStream.on("data", this.broadcast);
  }

  get_feed() {
    var msk = "raspivid -t 0 -o - -w %d -h %d -fps %d";
    var cmd = util.format(msk, this.options.width, this.options.height, this.options.fps);
    console.log(cmd);
    var streamer = spawn('raspivid', ['-t', '0', '-o', '-', '-w', this.options.width, '-h', this.options.height, '-fps', this.options.fps, '-pf', 'baseline']);
    streamer.on("exit", function(code){
      if ( code ) {
        console.log("Failure", code);
      }     
    });    

    return streamer;
  }

  broadcast(data) {
    this.wss.clients.forEach(function(socket) {

      if(socket.busy)
        return;

      socket.busy = true;
      socket.busy = false;

      socket.send(Buffer.concat([NALseparator, data]), { binary: true}, function ack(error) {
        socket.busy = false;
      });
    });
  }

  new_client(socket) {
  
    var self = this;
    console.log('New WebSocket connection');
    
    // start stream on new connection
    self.start_feed();

    socket.send(JSON.stringify({
      action : "init",
      width  : this.options.width,
      height : this.options.height,
    }));

    socket.on("message", function(data){
      // data = quaternionData object { x: x, y: y, z: z, w: w };
      data = JSON.parse( data );
      // console.log( data ); 
    });

    socket.on('close', function() {
      if ( 'readStream' in self ) {
        self.readStream.stdout.destroy();
      }
      
      console.log('WebSocket client disconnected');
    });
  }

};


module.exports = _Server;
