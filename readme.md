
# RPi VR Pan / Tilt Machine

| Dependency | Version                   | Description                           |
| ---------- |:-------------------------:| -------------------------------------:|
| Raspbian   | GNU/Linux 9.1 (stretch)   |                                       |
| nodejs     | v9.5.0                    |                                       |
| npm        | 5.6.0                     |                                       |


sudo apt-get update

#nodejs
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install nodejs

##### Clone repository 
git clone https://github.com/Crikey-Mikey/pi-vr-cam.git
I just installed into users home directory for permissions simplicity

##### install npm packages
From project directory:
sudo npm install

##### Start Server
npm start