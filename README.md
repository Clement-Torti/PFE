# Etester
This document is in two parts: A tutorial on how to use this tool, and the setup process to run it locally.
ETester is a javascript MEAN app that allows the tester to generate the python code of the HGo Micro tests. 



# Tutorial
You should have done the setup process explain in the setup section bellow before starting using the web app. Then:
1. Make sure mongo is running (it should start automatically when windows launched. You can use the app Mongo Compass and verify that you can access the database)
2. Open the project in a terminal. Go to /frontend and run "npm run start". 
Open another terminal, go to /backend and run "nodemon app.js"
3. Go to http://localhost:4200/ to access eTester.

eTester is composed of four pages:
1. **Homepage**: This page is used to import the local directory containing the generated python code. Please note that web browsers don't allow to import empty folders. Thus, at first launch, select a folder containing a random .py files and remove it right away in the **Testpage**. 

2. **Testpage**: Once a directory is selected, you can open this page by selecting the pencil logo on the left navigation panel. You can create a new test clicking the "Add File" blue button and open it by clicking on it in the tests' list. The details of the test appears on the right side where the tester can fill the meta data of the test, including the tested device if relevant. A blue button on the top right hand corner allows to save the test and generates the python code by opening the **Codepage**. Further bellow, the tester can define the scenario of the test. It can add steps click the blue "Add Step button" and remove them clicking the red trash button next to it.
Actions can then be added to a step by clicking the white select element bellow it. A list of actions appears, divided into sections. Once an action is selected, the tester may need to fill the parameters of the action, respecting the type mentionned in parentesis. Actions can be removed or moved by using the buttons on it right. Here are some tips to cinsider while defining a scenario:
- Reading the description of the action selected. Some actions requires the presence of other actions before in the same steps. Some other requires a special format (sql). Some gives a variable in return.
- All parameters should be provided when generating the code. The field corresponding to a paramter is extensible by dragging the corner, if more room is required.
- The test is only saved when clinking the generate code button. Don't open a new test or change the page before having saved your progress.
- Keep in mind the in the generated code, each step correspond to a distinct function. Thus, you should place related actions inside the same step. Example: there is an action that allow to compares the old and new values of a peripheral. This action require the presence of the action "Read measurements" before and in the same step.
- Action parameters of type text are surrounded by double quotes " " when generating the code. The tester should use simple quotes ' ' if he need so, to avoid conflict.
- Boolean param should either be True or False. 

1. **Codepage**: When clinking the blue top right hand corner code button, this page opens containg the generated python code associated with the test. You can click the "copy" button and paste it in a separated file in the official python test directory of SVN (svn://svn/Python/Sources/Bench_Recette/trunk/HealthGOMicro/HGo_Micro_310). When this page opens, it save the test in the database.Finally, click the "Close" button to return to the test.

2. **StepPage**: You can access this page by clicking the blue "edit steps" label at the bottom of each test scenario. Don't forget to save your test before doing this, or you will lose any unsaved changes. This page allows the tester to define his own step type by defining what the python generated code should looks like. The goal is to make the step library extensible for futur needs.
Changing the generated code of an existing step is possible but discourage. Indeed, doing this will prevent the parsing of old test using the old version of the step (To be exact, only changing the paramaters of the generated code create such problem).
The tester can create new steps by clicking the "Add step" blue button. The tester should then fill each field and provide valid python code. The tester can add parameters to the step by using the fields bellow the code text area. Clicking the "Add" button will append the parameter (ex: \\~test: Text~\\) to the code. Click the blue button "Save" in the top right hand corner to save the step.
Click the "return" label on the top left hand corner to return to your test. 


Finally, the generated code **should be revised before execution**. Before each action of the genarated code is define a **tag** that looks like this: `#__6480941ee70bbeb9ba7e0ad0__message(Text):"Simuler une panne du module Bluetooth en le desactivant a l'aide de l'interrupteur situe sur le HealthGo Micro."`
 This tag is used for parsing the python file back to a test. It has been removed from the converted test TC-1 to 40, as they are not likely to change. You might want to remove it too. The tag associated with the "Custom code" action leads to a bugg in the script file. It should be removed and the code of the action "Custom code" uncommented.

The generated script should be placed in the test folder of SVN (svn://svn/Python/Sources/Bench_Recette/trunk/HealthGOMicro/HGo_Micro_310). The file baseTest.py should be present in the same folder, just like testUtils.py and ScriptParam.py
Execute the python script using: py ./scriptname.py 
or py -3.10 ./scriptname.py


# Setup
Run:
`npm update`
Version recommandée:
node: v16.14.2
npm: latest (>8.5.0)


## Backend 
localhost:3000

## Installation process (Windows 10)
`cd backend`<br/>
`npm init -y`<br/> 
`npm install express mongoose`<br/>
`npm install -g nodemon`<br/>
nodemon is an unsigned script blocked by windows, to allow it to run: <br/>
`Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force`

### Mongo
https://www.mongodb.com/try/download/community
my directory where data is saved: C:\Program Files\MongoDB\Server\6.0\data\

### Postman
Use to tests api endpoint.
Setup requests by dividing them into folders. 
Don't forget to use env variable por domain and port.

### Eslint for backend
https://dev.to/drsimplegraffiti/eslint-configuration-for-node-project-275l <br/>
ESLint for VSCode <br/>
`cd backend && npx eslint --init`

Autofix when saving: Add to vscode settings.json <br/>
`
"editor.codeActionsOnSave": {
"source.fixAll.eslint": true
},
"eslint.validate": ["javascript"]`


### Winston
`npm install winston` <br/>
`config is in backend/lib/logger.js`


### Run
#### Launch backend server 
`cd backend && nodemon app.js`

#### Launch Mongo
Mongo has been defined as a service, it should launch automatically when starting windows
Launch Compass app to access gui

## Front-end
localhost:4200

### Angular cli
`npm install -g @angular/cli` <br/>
`ng version` (check if angular cli is installed) <br/>
(to create a new project: `ng new frontend --directory ./`) (yes for Router, CSS)

### Launch front-end server 
`cd frontend && npm install bootstrap-css`
`ng serve` <br/>

### Useful commands
`cd frontend/src/app && ng generate component component/<name>` <br/>
`cd frontend && ng lint --fix`

### ESLint an prettier for front-end
follow these steps: <br/>
https://dev.to/this-is-angular/configure-prettier-and-eslint-with-angular-526c
`cd frontend && ng add @angular-eslint/schematics` <br/>
`npm install prettier --save-dev` <br/>
`npx prettier --write .` <br/>
`npm install prettier-eslint eslint-config-prettier eslint-plugin-prettier --save-dev` <br/>
`cd frontend && ng lint --fix` <br/>



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

## Useful tips
in HTML angular file, create any kind of element using: .element.className
in css angular, "css" user snippet will create the css template with css categories
