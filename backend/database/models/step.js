const mongoose = require('mongoose')
const { StepType } = require('./stepType')

const StepSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minlength: 3
  },

  description: {
    type: String,
    trim: true,
    minlength: 0
  },

  code: {
    type: String,
    trim: true,
    minlength: 0
  },

  params: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Param'
    }],
    default: []
  },

  stepType: {
    type: String,
    enum: Object.values(StepType)
  }
})

const Step = mongoose.model('Step', StepSchema)

module.exports = Step
