/*
  LIFECYCLE_COMMANDS: 'Lifecycle Commands',
  MESSAGE_COMMANDS: 'Message Commands',
  DEVICE_COMMANDS: 'Device Commands',
  DATABASE_COMMANDS: 'Database Commands',
  SERIAL_COMMANDS: 'Serial Commands',
  OM2M_COMMANDS: 'OM2M Commands',
  SSH_COMMANDS: 'SSH Commands',
  OTHER: 'Other'
*/
const predefinedSteps = [
  {
    title: 'Send Question',
    description: 'Send a question to the user and wait for a response. Verify if the response is conform to specs.',
    code: `message = \\~message: Text~\\
spec =  \\~spec: Text~\\
isYesOK = \\~shouldBeEqual: Boolean~\\
newRes = self.sendQuestion(message, stepNumber, spec, isYesOK)
result = self.updateResult(result, newRes)`,
    stepType: 'Message Commands'
  },
  {
    title: 'Restart HGo',
    description: 'Restart HGo and wait for it to be ready.',
    code: `newRes = self.restartHGo()
result = self.updateResult(result, newRes)`,
    stepType: 'Lifecycle Commands'
  },
  {
    title: '',
    description: '',
    code: '',
    stepType: ''
  },
  {
    title: '',
    description: '',
    code: '',
    stepType: ''
  },
  {
    title: '',
    description: '',
    code: '',
    stepType: ''
  },
  {
    title: '',
    description: '',
    code: '',
    stepType: ''
  },
  {
    title: '',
    description: '',
    code: '',
    stepType: ''
  }

]

module.exports = predefinedSteps
