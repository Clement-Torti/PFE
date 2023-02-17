const express = require('express');
const app = express(); 
const mongoose = require('./database/mongoose');

/*
CORS - Cross Origin Request Security.
Authorized backend request from source other than port 3000
*/
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
// })


app.use(express.json());
app.listen(3000, () => console.log("Server connected on port 3000"))

