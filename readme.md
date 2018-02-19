
# RPi VR Pan / Tilt Machine

| Dependency | Version                   | Description                           |
| ---------- |:-------------------------:| -------------------------------------:|
| Raspbian   | GNU/Linux 9.1 (stretch)   |                                       |
| git        | 2.11.0                    | Included Raspbian dist                |
| nodejs     | v9.5.0                    |                                       |
| npm        | 5.6.0                     |                                       |


## Setup
```bash
sudo apt-get update
```

##### nodejs
```bash
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -  
sudo apt-get install nodejs
```
##### Clone repository 
```bash
git clone https://github.com/Crikey-Mikey/pi-vr-cam.git
```
I just installed into users home directory for permissions simplicity

##### install npm packages
From project directory:
```bash
sudo npm install
```

##### Start Server
```bash
npm start
```