"use strict";

const Gpio      = require('pigpio').Gpio;
const motorTilt = new Gpio(10, {mode: Gpio.OUTPUT});
const motorPan  = new Gpio(9, {mode: Gpio.OUTPUT});

class _Servos {

  constructor() {    

    this.tilt = {
      // tilt down limit:
      min : 1800,
      // tilt up limit:
      max : 2300
    };

    this.pan = {
      // pan left limit:
      min : 500,
      // pan right limit:
      max : 1600 
    };

    // bind functions
    this.servos_init = this.servos_init.bind(this);  
    this.centerPosition = this.centerPosition.bind(this);
    this.tiltCamera = this.tiltCamera.bind(this);
    this.panCamera = this.panCamera.bind(this);

    // let go
    this.servos_init();
  }

  // Start and position servos 
  servos_init() {
    let tiltCenter = this.centerPosition(this.tilt.min, this.tilt.max);
    let panCenter  = this.centerPosition(this.pan.min, this.pan.max);
    
    motorTilt.servoWrite(tiltCenter);   
    motorPan.servoWrite(panCenter);
    
    // store range
    this.tilt.range = this.tilt.max - this.tilt.min;
    this.pan.range  = this.pan.max  - this.pan.min;

    // store state
    this.pan.lastPosition = panCenter;
    this.pan.lastAplha = null;
  }
  onRotation(data) {
    // console.log( data );

    this.tiltCamera(data.beta);
    this.panCamera(data.alpha);
  }

  tiltCamera(beta) {
    let tiltPercentage = beta / 180;
    let tilt = (this.tilt.range * tiltPercentage ) + this.tilt.min;    
    // round up
    tilt = Math.ceil(tilt);

    // do no allow tilt value to go outside of servo limits
    if (tilt < this.tilt.min) tilt = this.tilt.min;
    if (tilt > this.tilt.max) tilt = this.tilt.max;
    
    motorTilt.servoWrite(tilt);
  }

  panCamera(alpha) {
    let increment;
    alpha = Math.ceil(alpha);
    if ( !this.pan.lastAplha ) this.pan.lastAplha = alpha;

    if ( alpha > (this.pan.lastAplha + 5) ) {
      // move left      
      increment = (alpha - this.pan.lastAplha) * 5;
      if ( increment > 200 ) increment = 200; //max increment amount
      this.pan.lastPosition = this.pan.lastPosition - increment;
    } else if ( alpha < (this.pan.lastAplha - 5)  ) {
      // move right
      increment = (this.pan.lastAplha - alpha) * 5;
      if ( increment > 200 ) increment = 200; //max increment amount    
      this.pan.lastPosition = this.pan.lastPosition + increment;
    } else {
      return;
    }
    
    this.pan.lastAplha = alpha;

    // do no allow pan value to go outside of servo limits
    if (this.pan.lastPosition < this.pan.min) this.pan.lastPosition = this.pan.min;
    if (this.pan.lastPosition > this.pan.max) this.pan.lastPosition = this.pan.max;

    motorPan.servoWrite(this.pan.lastPosition);
    
  }

  // calculates the center of 2 values
  centerPosition(min, max) {
    return min + ( (max - min) / 2 );
  }

};


module.exports = _Servos;