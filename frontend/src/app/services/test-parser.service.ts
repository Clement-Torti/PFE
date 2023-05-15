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

  private parseNextLine(code: string[], nbLine = 1): string[] {
    if (nbLine == -1 && code.length > 0) {
      if (code[0].length == 0) {
        return this.parseNextLine(code.slice(1), -1);
      }
      return code;
    }

    if (code.length > nbLine) {
      return code.slice(nbLine);
    } else {
      throw new Error('Bad format: Unexpected end of file');
    }
  }

  private testFormat(toBeTested: string, expected: string) {
    if (toBeTested !== expected) {
      throw new Error(
        "Bad format: \nExpected '" + expected + "'\nGot '" + toBeTested + "'"
      );
    }
  }

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
      /# Title: (.+)\n# Author: (.+)\n# Description: (.+)\n# Prerequisites: (.+)/;

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
