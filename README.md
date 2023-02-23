# PFE
Code of the final study project at Enseeiht/edevice. A javascript MEAN app. Allow to generate the python code associated with a test define at high level.. 




## Backend 
localhost:3000

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

### Eslint for backend
https://dev.to/drsimplegraffiti/eslint-configuration-for-node-project-275l
ESLint for VSCode
cd backend && npx eslint --init

Autofix when saving: Add to vscode settings.json
"editor.codeActionsOnSave": {
"source.fixAll.eslint": true
},
"eslint.validate": ["javascript"]


### Winston
npm install winston
config is in backend/lib/logger.js


### Run
#### Launch backend server 
cd backend && nodemon app.js

#### Launch Mongo
Mongo has been defined as a service, it should launch automatically when starting windows
Launch Compass app to access gui

## Front-end
localhost:4200

### Angular cli
npm install -g @angular/cli
ng version (check if angular cli is installed)
ng new frontend --directory ./ (yes for Router, CSS)

### Launch front-end server 
cd frontend && ng serve

cd frontend && npm install bootstrap-css

### Usefull commands
cd frontend/src/app && ng generate component component/<name>
cd frontend && ng lint --fix

### ESLint an prettier for front-end
follow these steps:
https://dev.to/this-is-angular/configure-prettier-and-eslint-with-angular-526c
cd frontend && ng add @angular-eslint/schematics
npm install prettier --save-dev
npx prettier --write .
npm install prettier-eslint eslint-config-prettier eslint-plugin-prettier --save-dev
cd frontend && ng lint --fix



## Other config



## Best practices
The code should also not exceed 75 lines for each function.
The code should not exceed the limit of 400 lines per file.
There should be an empty line between imports and modules.
Variables with constant values should be declared with ‘const.’
Leverage ng-bind In Place Of {{}}
Single Responsibility Principle. It is important to not create more than one instance of any component, directive, or service within a single file.
Use Directive For DOM Handling
Split Large Components Into Smaller Sizes. They can be broken down to a point where each component features no more than one atomic task.
Make Use Of Angular CLI
Controller As Syntax
Use Common HTTP Service