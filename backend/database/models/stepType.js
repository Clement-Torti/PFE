// Define the enum for StepType
// See /frontend/src/app/models/stepType.ts for the front-end equivalent
const StepType = Object.freeze({
  LIFECYCLE_COMMANDS: 'Lifecycle Commands',
  MESSAGE_COMMANDS: 'Message Commands',
  DEVICE_COMMANDS: 'Device Commands',
  DATABASE_COMMANDS: 'Database Commands',
  SERIAL_COMMANDS: 'Serial Commands',
  OM2M_COMMANDS: 'OM2M Commands',
  SSH_COMMANDS: 'SSH Commands',
  OTHER: 'Other'
})

// Export the StepType enum
module.exports = { StepType }
