
# RPi VR Pan / Tilt Machine

### Hardware
- Raspberry Pi 
- Raspberry Pi: NoIR Camera V2


### Software

| Dependency | Version                   | Description                           |
| ---------- |:-------------------------:| -------------------------------------:|
| Raspbian   | GNU/Linux 9.1 (stretch)   |                                       |
| raspivid   | v1.3.12                   | Included in Raspbian dist (9.1)       |
| git        | 2.11.0                    | Included in Raspbian dist (9.1)       |
| pigpio     | 1.64-1                    | Included in Raspbian dist (9.1)       |
| nodejs     | v9.5.0                    |                                       |
| npm        | 5.7.1                     |                                       |


Frontend JS libraries:  
https://github.com/adtile/Full-Tilt  
https://github.com/matijagaspar/ws-avc-player  

Setup 
======

```bash
sudo apt-get update
```

### nodejs
```bash
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -  
sudo apt-get install nodejs
```

### pigpio (if required)
https://www.npmjs.com/package/pigpio    
```bash
sudo apt-get install pigpio
```

### Clone repository 
```bash
git clone https://github.com/Crikey-Mikey/pi-vr-cam.git
```
I just installed into users home directory for permissions simplicity

### Install npm packages
From project directory:
```bash
npm install
```

### Start Server
```bash
npm start
```