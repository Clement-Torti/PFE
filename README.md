# PFE
Code of the final study project at Enseeiht/edevice. A javascript MEAN app. Allow to generate the python code associated with a test define at high level.. 


## Installation process (Windows 10)

### Project creation
cd backend
npm init -y
npm install express mongoose
npm install -g nodemon
nodemon is an unsigned script blocked by windows, to allow it to run: $Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force

### Mongo install
https://www.google.com/search?q=install+mongodb&rlz=1C1CHBD_frFR1001FR1001&oq=install+mongo&aqs=chrome.0.0i512j69i57j0i512l8.3543j0j7&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:2300b704,vid:PmjTR5FvnuE

my directory where data is saved: C:\Program Files\MongoDB\Server\6.0\data\


## Run
### Launch server 
nodemon app.js

### Launch Mongo
Mongo has been defined as a service, it should launch automatically when starting windows
Launch Compass app to access gui