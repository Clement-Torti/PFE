const express = require('express')
const router = express.Router()
// const Logger = require('../lib/logger')
const { StepType } = require('../database/models/stepType')

router.get('/step-types', (req, res) => {
  const stepTypes = Object.values(StepType)
  res.json(stepTypes)
})

module.exports = router
