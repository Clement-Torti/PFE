import { Injectable } from '@angular/core';
import { Test } from '../models/test';
import { Step } from '../models/step';
import { EMPTY_TEST } from '../mocks/test-mock';

@Injectable({
  providedIn: 'root',
})
export class TestParserService {
  parseFile(file: string): Test {
    const test = EMPTY_TEST;
    let code = file.split('\n');

    code = this.parseHeader(code, test);

    return test;
  }

  private parseHeader(code: string[], test: Test): string[] {
    test.description = 'test desc';
    return [''];
  }

  private generateHeader(test: Test): string {
    const title = `# Title: ${test.title}\n`;
    const author = `# Author: ${test.author} - using eTester\n`;
    const description = `# Description: ${test.description}\n`;
    const prerequisites = `# Prerequisites: ${test.prerequisites}\n`;
    let deviceType = '';

    if (test.deviceType) {
      deviceType = `# Device : ${test.deviceName} (${test.deviceType})\n`;
    }

    return title + author + description + prerequisites + deviceType + '\n';
  }

  private generateSteps(test: Test): string {
    let steps = '';

    for (let i = 0; i < test.steps.length; i++) {
      const step = test.steps[i];

      steps += `def step${i + 1}(self):
        self.logScenario("Step ${i + 1}: ", "${step.title}", "${
        step.description
      }")

        ${step.code}


      `;
    }

    return steps;
  }

  private generateMain(test: Test): string {
    let main = `def test(self):
        # ----------- 
        # Init part
        # 
        self.logScenario("Initialization")
    
    `;

    for (let i = 0; i < test.steps.length; i++) {
      const step = test.steps[i];

      main += `
        # ${step.title}
        self.step${i + 1}();
      `;
    }

    main += `

        # -----------
        # Factory reset
        # 
        self.logScenario("Factory reset")`;

    return main;
  }

  generateCode(test: Test): string {
    const header = this.generateHeader(test);

    const className = `class HGMicro_Test(HGoMicro_Software_Verification_Base_Test):
      def __init__(self):
        super().__init__("${test.title}")`;

    const steps = this.generateSteps(test);

    const main = this.generateMain(test);

    return header + className + steps + main;
  }
}
