const predefinedSteps = [
  /* LIFECYCLE COMMANDS */
  {
    title: 'Restart HGoMicro',
    description: 'Restart HGo and wait for it to be ready.',
    code: `newRes = self.restartHGo()
result = self.updateResult(result, newRes)`,
    stepType: 'Lifecycle Commands'
  },
  {
    title: 'Sleep',
    description: 'Make the HGoMicro sleep for a certain amount of time.',
    code: `duration = \\~duration: Number~\\
self.sleep(duration)`,
    stepType: 'Lifecycle Commands'
  },
  {
    title: 'Power off HGoMicro',
    description: 'Power off HGoMicro undefinetly.',
    code: 'self.powerOffHgo()',
    stepType: 'Lifecycle Commands'
  },
  {
    title: 'Power on HGoMicro',
    description: 'Power on HGoMicro.',
    code: 'self.powerOnHgo()',
    stepType: 'Lifecycle Commands'
  },

  /* MESSAGE COMMANDS */
  {
    title: 'Prompt question',
    description: 'Send a question to the user and wait for a response. Verify if the response is conform to specs.',
    code: `message = \\~message: Text~\\
spec = \\~specifications: Text~\\
isYesOK = \\~should be true: Boolean~\\
newRes = self.sendQuestion(message, stepNumber, spec, isYesOK)
result = self.updateResult(result, newRes)`,
    stepType: 'Message Commands'
  },

  {
    title: 'Prompt order',
    description: 'Send an order to the user',
    code: `message = \\~message: Text~\\
self.sendOrder(message)`,
    stepType: 'Message Commands'
  },
  {
    title: 'Disconnect and reconnect batteries',
    description: 'Ask the user to disconnect and reconnect the batteries. Wait for the user to confirm.',
    code: `periphName = \\~Name of peripheral: Text~\\
newRes = self.disconnectAndReconnectBatteries(periphName)
result = self.updateResult(result, newRes)`,
    stepType: 'Message Commands'
  },

  /* DATABASE COMMANDS */
  {
    title: 'Reset database',
    description: 'Configure the HGMicro to use default parameter',
    code: `newRes = self.resetDb()
result = self.updateResult(result, newRes)`,
    stepType: 'Database Commands'
  },

  /* DEVICE COMMANDS */
  {
    title: 'Remove peripheral',
    description: 'Remove the peripheral so it does not exist anymore.',
    code: `deviceSerialNumber = \\~peripheral serial number: Text~\\
self.removePeriph(deviceSerialNumber)`,
    stepType: 'Device Commands'
  },
  {
    title: 'Add peripheral',
    description: 'Add a peripheral associated to the HGMicro.',
    code: `deviceSerialNumber = \\~peripheral serial number: Text~\\
deviceSensorType = \\~Sensor type: Text~\\
self.addPeriph(deviceSerialNumber, deviceSensorType, self.param.hgoMiniSerialNumber)`,
    stepType: 'Device Commands'
  },
  {
    title: 'Get measurements',
    description: 'Get the measurements of a peripherala and store them so you can compare it later.',
    code: `deviceSerialNumber = \\~peripheral serial number: Text~\\
deviceId = self.periphs[deviceSerialNumber]["deviceId"]
oldMeasurements = self.getMeasurements(self.param.ccaUserId, deviceId)`,
    stepType: 'Device Commands'
  },
  {
    title: 'Get new measurements and compare',
    description: 'Warning: "Get measurements" must be called before in the same step. Get the measurements of a peripheral and compare them to the old ones.',
    code: `deviceSerialNumber = \\~peripheral serial number: Text~\\
deviceId = self.periphs[deviceSerialNumber]["deviceId"]
newMeasurements = self.getMeasurements(self.param.ccaUserId, deviceId)
spec = \\~specifications: Text~\\
shouldBeDifferent = \\~should be different: Boolean~\\

newRes = self.compareMeasurements(spec, stepNumber, oldMeasurements, newMeasurements, shouldBeDifferent)
result = self.updateResult(result, newRes)`,
    stepType: 'Device Commands'
  },
  /* SERIAL COMMANDS */
  {
    title: 'Send serial command',
    description: 'Send a serial command and sleep 2 seconds.',
    code: `command = \\~command: Text~\\
newRes = SendSerial(command, self.param.ser, self.queue, 10)
self.sleep(2)
result = self.updateResult(result, newRes)`,
    stepType: 'Serial Commands'
  },
  {
    title: 'Send serial and wait answer.',
    description: 'Send a serial command and wait for an answer.',
    code: `command = \\~serial command: Text~\\
answer = \\~searched string: Text~\\
spec = \\~specifications: Text~\\
timeToWait = \\~time to wait: Number~\\

newRes = self.sendSerialAndWaitAns(command, answer, spec, timeToWait)
result = self.updateResult(result, newRes)`,
    stepType: 'Serial Commands'
  }
]

module.exports = predefinedSteps
