const express = require('express')
const router = express.Router()
const Logger = require('../lib/logger')
const Step = require('../database/models/step')
const Param = require('../database/models/param')

router.get('/steps', (req, res) => {
  Step.find({})
    .then(steps => res.send(steps))
    .catch((error) => Logger.http(error))
})

router.post('/steps', async (req, res) => {
  try {
    // Create and save the Param objects
    const paramIds = []
    for (const param of req.body.params) {
      const newParam = new Param(param)
      await newParam.save()
      paramIds.push(newParam._id)
    }

    // Create the Step object with the Param ids
    const newStep = new Step({
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      params: paramIds,
      stepType: req.body.stepType
    })

    // Save the Step object to the database
    await newStep.save()

    res.status(201).json(newStep)
  } catch (err) {
    Logger.http(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
