const mongoose = require('mongoose')
const { ParamType } = require('./paramType')

const ParamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  value: {
    type: String,
    required: true
  },

  paramType: {
    type: String,
    enum: Object.values(ParamType),
    required: true
  }
})

const Param = mongoose.model('Param', ParamSchema)

module.exports = Param
