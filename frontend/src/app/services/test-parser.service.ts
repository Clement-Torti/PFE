import { Injectable } from '@angular/core';
import { Test } from '../models/test';
import { DeviceType } from '../models/deviceType';

import { getEmptyTest } from '../mocks/test-mock';
import { StepParserService } from './step-parser.service';
import { formatTest } from '../parsage/testFormat';

@Injectable({
  providedIn: 'root',
})
export class TestParserService {
  PYTHON_INDENT = '    ';
  constructor(private stepParserService: StepParserService) {}

  async parseFile(file: string): Promise<Test> {
    const test = this.parseHeader(file);

    const code = file.split('\n');

    // Remove header so code[0] is the first step
    const searchString = `def step1(self):`;
    const index = code.findIndex((element) => element.includes(searchString));

    code.splice(0, index);

    // Parse steps
    test.steps = await this.stepParserService.parseSteps(code);

    return test;
  }

  private parseHeader(code: string): Test {
    const test = getEmptyTest();
    const infoPattern =
      /# Title: (.+)\n# Author: (.+) - using eTester\n# Description: (.+)\n# Prerequisites: (.+)/;

    let match = code.match(infoPattern);
    if (match) {
      test.title = match[1];
      test.author = match[2];
      test.description = match[3];
      test.prerequisites = match[4];
    } else {
      throw new Error('Bad format: Test info not found');
    }

    const devicePattern = /# Device : (.+) \((.+)\)/;
    match = code.match(devicePattern);
    if (match) {
      test.deviceName = match[5];
      test.deviceType = match[6] as DeviceType;
    }

    return test;
  }

  private generateSteps(test: Test): string {
    let steps = '';
    for (let i = 0; i < test.steps.length; i++) {
      const code = this.stepParserService.generateStep(
        test.steps[i],
        i + 1,
        this.PYTHON_INDENT
      );
      steps += code;
      steps += `\n\n`;
    }

    return steps;
  }

  generateCode(test: Test): string {
    const steps = this.generateSteps(test);
    let periph = '';

    if (test.deviceType) {
      periph = `self.periphs = {
${this.PYTHON_INDENT}${test.deviceName}: {
${this.PYTHON_INDENT}"sensorType": "${DeviceType.getAbbreviation(
        test.deviceType
      )}",
${this.PYTHON_INDENT}"deviceId": None,
${this.PYTHON_INDENT}"kittingId": None,
${this.PYTHON_INDENT}}
}`;
    }

    return formatTest(this.PYTHON_INDENT, test, periph, steps);
  }
}
