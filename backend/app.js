const express = require('express')
const app = express()

// Logger
const Logger = require('./lib/logger')
Logger.error('This is an error log')
Logger.warn('This is a warn log')
Logger.info('This is a info log')
Logger.http('This is a http log')
Logger.debug('This is a debug log')

// Database
// eslint-disable-next-line
const mongoose = require('./database/mongoose')

// Model

// Access permissions
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // Allow any origin to access our api
  res.header('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(express.json())

// Routes
const folderRoutes = require('./routes/folderRoutes')
app.use('/', folderRoutes)

const fileRoutes = require('./routes/fileRoutes')
app.use('/', fileRoutes)

app.listen(3000, () => Logger.info('Server connected on port 3000'))
