const express = require('express')
const router = express.Router()
const Logger = require('../lib/logger')
const Step = require('../database/models/step')

router.get('/steps', (req, res) => {
  Step.find({})
    .then(steps => res.send(steps))
    .catch((error) => Logger.http(error))
})

router.get('/steps/:stepId', (req, res) => {
  Step.findOne({ _id: req.params.stepId })
    .then((step) => res.send(step))
    .catch((error) => Logger.http(error))
})

router.post('/steps', async (req, res) => {
  try {
    // Create the Step object with the Param ids
    const newStep = new Step({
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
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

// update a step
router.put('/steps/:stepId', async (req, res) => {
  try {
    // Get the step
    const step = await Step.findOne({ _id: req.params.stepId })

    // Update the step
    step.title = req.body.title
    step.description = req.body.description
    step.code = req.body.code
    step.stepType = req.body.stepType

    await step.save()
    res.status(200).json(step)
  } catch (err) {
    Logger.http(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.delete('/steps/:stepId', (req, res) => {
  Step.deleteOne({ _id: req.params.stepId })
    .then((step) => res.send(step))
    .catch((error) => Logger.http(error))
})

router.delete('/all-steps', (req, res) => {
  Step.deleteMany({})
    .then((steps) => res.send(steps))
    .catch((error) => Logger.http(error))
})

module.exports = router
