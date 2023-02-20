# PFE
Code of the final study project at Enseeiht/edevice. A javascript MEAN app. Allow to generate the python code associated with a test define at high level.. 




## Backend 

## Installation process (Windows 10)
cd backend
npm init -y
npm install express mongoose
npm install -g nodemon
nodemon is an unsigned script blocked by windows, to allow it to run: $Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force

### Mongo
https://www.google.com/search?q=install+mongodb&rlz=1C1CHBD_frFR1001FR1001&oq=install+mongo&aqs=chrome.0.0i512j69i57j0i512l8.3543j0j7&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:2300b704,vid:PmjTR5FvnuE

my directory where data is saved: C:\Program Files\MongoDB\Server\6.0\data\

### Postman
Use to tests api endpoint.
Setup requests by dividing them into folders. 
Don't forget to use env variable por domain and port.


### Run
#### Launch server 
cd backend && nodemon app.js

#### Launch Mongo
Mongo has been defined as a service, it should launch automatically when starting windows
Launch Compass app to access gui


## Front-end

### Angular cli
npm install -g @angular/cli
ng version (check if angular cli is installed)