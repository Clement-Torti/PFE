// Define the enum for ParamType
// See /frontend/src/app/models/param.ts for the front-ent equivalent
const ParamType = Object.freeze({
  STRING: 'Text',
  NUMBER: 'Number',
  BOOL: 'Boolean'
})

// Export the StepType enum
module.exports = { ParamType }
