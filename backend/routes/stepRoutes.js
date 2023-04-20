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

router.get('/steps/:stepId', (req, res) => {
  Step.findOne({ _id: req.params.stepId })
    .populate('params')
    .then((step) => res.send(step))
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

    // Add the new params
    for (const param of req.body.params.filter(param => !param._id)) {
      const newParam = new Param(param)
      await newParam.save()
      step.params.push(newParam._id)
      param._id = newParam._id
    }

    // Update the params
    for (const param of req.body.params) {
      const paramToUpdate = await Param.findOne({ _id: param._id })
      paramToUpdate.name = param.name
      paramToUpdate.type = param.type
      paramToUpdate.value = param.value
      await paramToUpdate.save()
    }

    // Delete the params that were previously there but are not anymore
    for (const param of step.params.filter(param => !req.body.params.find(p => p._id === param._id))) {
      Logger.http('Deleting param ' + param)
      await Param.deleteOne({ _id: param._id })
      step.params = step.params.filter(p => p._id !== param._id)
    }

    await step.save()
    res.status(200).json(step)
  } catch (err) {
    Logger.http(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.delete('/steps/:stepId', (req, res) => {
  // Get all the step params
  Step.findOne({ _id: req.params.stepId })
    .then((step) => {
      // Delete all the params
      Param.deleteMany({ _id: { $in: step.params } })
        .then(() => {
          // Delete the step
          step.deleteOne()
            .then((step) => res.send(step))
            .catch((error) => Logger.http(error))
        })
        .catch((error) => Logger.http(error))
    })
    .catch((error) => Logger.http(error))
})

router.delete('/all-steps', (req, res) => {
// Delete all params
  Param.deleteMany({})
    .then(() => {
      // Delete all steps
      Step.deleteMany({})
        .then((steps) => res.send(steps))
        .catch((error) => Logger.http(error))
    })
    .catch((error) => Logger.http(error))
})

module.exports = router
