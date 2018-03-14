"use strict";

const Gpio      = require('pigpio').Gpio;
const motorTilt = new Gpio(10, {mode: Gpio.OUTPUT});
const motorPan  = new Gpio(9, {mode: Gpio.OUTPUT});

class _Servos {

  constructor() {    

    this.tilt = {
      min : 1800, // tilt down limit
      max : 2300 // tilt up limit
    };

    this.pan = {
      min : 500, // pan left limit
      max : 1600 // pan right limit 
    };

		// functions
		this.servos_init = this.servos_init.bind(this);  
		this.centerPosition = this.centerPosition.bind(this);

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
    this.pan.range = this.pan.max - this.pan.min;

    // store state
    this.tilt.lastValue = tiltCenter;
    this.pan.lastValue  = panCenter;
  }
  onRotation(data) {
    console.log( data );

    // TILT
    let tiltPercentage = data.beta / 180;
    let tilt = (this.tilt.range * tiltPercentage ) + this.tilt.min;    
    // round up
    tilt = Math.ceil(tilt);

    console.log(tilt);

    // do no allow tilt value to go outside of servo limits
    if (tilt < this.tilt.min) tilt = this.tilt.min;
    if (tilt > this.tilt.max) tilt = this.tilt.max;

    console.log(tilt);
    
    motorTilt.servoWrite(tilt);

  }

  onRotationOLD(data) {
    data = JSON.parse( data );
    // quaternion object { x: value, y: value, z: value, w: value };
    // euler object { alpha: value, beta: value, gamma: value };
    
    console.log( data );


    // console.log(data);
    // TILT
    var tilt = tiltCenter;
    if (data.beta > 100) {
      tilt = tilt + 200;
    } else if (data.beta < 50) {
      tilt = tilt - 200;
    }

    motorTilt.servoWrite(tilt);

    // PAN
    var gamma = Math.ceil(data.gamma);

    if ( gamma > ( lastAlphaValue + 10) ) {
      // left
      if ( lastPanValue > (panCenter - 400)  ) {
        lastPanValue = lastPanValue - 400;
      }
      
      lastAlphaValue = gamma;
    } else if ( gamma < ( lastAlphaValue - 10) ) {
      // right
      
      if ( lastPanValue < (panCenter + 400)  ) {
        lastPanValue = lastPanValue + 400;
      }
      lastAlphaValue = gamma;
    } else if (!lastAlphaValue) {
      lastAlphaValue = gamma;
    }

    motorPan.servoWrite(lastPanValue);


  }	

	// calculates the center of 2 values
  centerPosition(min, max) {
		return min + ( (max - min) / 2 );
  }

};


module.exports = _Servos;