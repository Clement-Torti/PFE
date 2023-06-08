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
  {
    title: 'Restart HGo with special boot message',
    description: 'Restart HGo and wait until receiving the provided boot message.',
    code: `bootMessage = \\~boot message: Text~\\
spec =  \\~specifications: Text~\\
newRes = self.restartHGo(bootMessage, stepNumber, spec)
result = self.updateResult(result, newRes)`,
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
    title: 'Send SQL commands',
    description: "Configure the database using sqlite3 cli. Separate each commands using '=>'. Add an expected answer for a command after ';' and providing the answer.",
    code: `textCommands = \\~sql commands: Text~\\
spec = \\~specifications: Text~\\

newRes = self.sendSQLCommands(stepNumber, textCommands, spec)
result = self.updateResult(result, newRes)`,
    stepType: 'Database Commands'
  },
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
    title: 'Get new measurements and compare to old ones',
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
  {
    title: 'Get measurements and compare length',
    description: 'Get the measurements of a device and provide a condition it length has to comply. (ex: >1)',
    code: `deviceId = \\~device serial number: Text~\\
spec = \\~specifications: Text~\\
comparison = \\~comparison: Text~\\

newRes = self.compareOneMeasurement(spec, stepNumber, comparison, deviceId)
result = self.updateResult(result, newRes)`,
    stepType: 'Device Commands'
  },
  {
    title: 'Measurement Time',
    description: 'Verify that measurements time correspond or not to today.',
    code: `deviceSN = \\~peripheral serial number: Text~\\ 
shouldBeToday = \\~should be today: Boolean~\\
    
newRes = self.measurementTimeIsToday(self, deviceSN , not shouldBeToday )
result = self.updateResult(result, newRes)`,
    stepType: 'Device Commands'
  },
  {
    title: 'Change peripheral unit and test',
    description: 'Change the peripheral unit and test that it is taken into account in the peripheral.',
    code: `deviceSerialNumber = \\~peripheral serial number: Text~\\
unit = \\~unit: Text~\\
hasUnit = \\~has unit: Boolean~\\
measureMessage = \\~message displayed to take a measure: Text~\\
peripheralSpecMessage = \\~HGo unit support specification: Text~\\
measureSpecMessage = \\~measure received specification: Text~\\

newRes = self.changePeriphUnitAndTest(self, stepNumber, deviceSerialNumber, unit if hasUnit else "", measureMessage, peripheralSpecMessage, measureSpecMessage)
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
  },
  {
    title: 'Wait boot linux',
    description: 'Reading the logs of HGo and waiting for "Hub successfully initialized" to be received.',
    code: 'self.WaitBootLinux(self.param.ser,self.queue, self.param.hgoMiniLogin, self.param.hgoMiniPassword)',
    stepType: 'Serial Commands'
  },
  {
    title: 'Wait serial',
    description: 'Read the standard ouput and wait for a string to be read.',
    code: `expectedStr = \\~expected string: Text~\\
timeToWait = \\~time to wait: Number~\\
newRes = WaitSerial(expectedStr, self.param.ser, self.queue, timeToWait)
result = self.updateResult(result, newRes)`,
    stepType: 'Serial Commands'
  },
  {
    title: 'Microcom configuration',
    description: "Configure the cellular module using microcom cli. Separate each commands using '=>'. Add an expected answer for a command after ';' and providing the answer.",
    code: `commands = \\~commands: Text~\\
spec = \\~specifications: Text~\\

newRes = self.configureMicrocom(stepNumber, commands, spec)
result = self.updateResult(result, newRes)`,
    stepType: 'Serial Commands'
  },

  /* OM2M COMMANDS */
  {
    title: 'Reboot now request',
    description: 'Post to the HGC frontend a message for the hub to reboot now. Run /postOm2mRequestRebootNowConnection',
    code: `data = {"hubId": self.param.hgoMiniSerialNumber, "customerId": self.param.customer}
self.httpPostHgcFrontend("/postOm2mRequestRebootNowConnection", data)`,
    stepType: 'OM2M Commands'
  },
  {
    title: 'Post OM2M add hub',
    description: 'Add hub to a certain customer using /postOm2mAddHub',
    code: `customerId = \\~customer id: Text~\\
data = {"hubId": self.param.hgoMiniSerialNumber, "customerId": customerId}

self.httpPostHgcFrontend("/postOm2mAddHub", data)`,
    stepType: 'OM2M Commands'
  },
  {
    title: 'Request SSH Connection',
    description: 'Run the HGC Frontend /postOm2mRequestSshConnection',
    code: `data = {"hubId": self.param.hgoMiniSerialNumber, "customerId": self.param.customer}
self.httpPostHgcFrontend("/postOm2mRequestSshConnection", data )`,
    stepType: 'OM2M Commands'
  },
  /* SSH Commands */
  {
    title: 'Waiting for SSH tunnel',
    description: "Typically run after /postOm2mRequestSshConnection. Wait for a long time the presence of 'tun0' using 'ifconfig'.",
    code: 'self.waitingForSSHConnection(stepNumber)',
    stepType: 'SSH Commands'
  },
  {
    title: 'Run SSH command',
    description: "Run an SSH Command. You have access to the 'sshResult' as well as the 'result' variable in your completion code.",
    code: `sshCommand = \\~ssh command: Text~\\
completionCode = \\~completion code: Text~\\

newRes = self.runSSHCommand(self, command, completionCode)
result = self.updateResult(result, newRes)`,
    stepType: 'SSH Commands'
  },
  /* OTHERS */
  {
    title: 'Custom code',
    description: 'Write any custom valid python code.',
    code: '\\~custom code: Text~\\',
    stepType: 'Other'
  }
]

module.exports = predefinedSteps
