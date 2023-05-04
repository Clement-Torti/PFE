import { Injectable } from '@angular/core';
import { Step } from '../models/step';
import { ParamType } from '../models/param';

@Injectable({
  providedIn: 'root',
})
export class StepParserService {
  constructor() {}

  // Parse the step code to add the params
  addParamToStep(step: Step): Step {
    const newStep = step;
    newStep.params = [];
    // Search for all the patterns in string: `\~${this.paramName}: ${this.paramType}~\`
    const regex = /\\~(.+): (.+)~\\/g;
    const matches = newStep.code.matchAll(regex);

    // For each match, add the param to the step
    for (const match of matches) {
      if (match.length !== 3) {
        throw new Error(
          'Bad format: Unexpected param format in step: ' + newStep
        );
      }

      newStep.params.push({
        name: match[1],
        type: match[2] as ParamType,
        value: '',
      });
    }
    return newStep;
  }

  generateStep(step: Step, stepNumber: number, PYTHON_INDENT: string): string {
    // Populating the step code with the params values
    let code = step.code;
    for (const param of step.params) {
      let value = param.value;
      if (param.type === ParamType.STRING) {
        value = `"${param.value}"`;
      }
      code = code.replace(
        new RegExp(`\\\\~${param.name}: ${param.type}~\\\\`, 'g'),
        value
      );
    }

    // Add python indent to each line of code
    code = code
      .split('\n')
      .map((line) => PYTHON_INDENT + PYTHON_INDENT + line)
      .join('\n');

    const stepCode = `${PYTHON_INDENT}def step${stepNumber}(self):
${PYTHON_INDENT}${PYTHON_INDENT}self.logScenario("Step ${stepNumber}: ", "${step.title}", "${step.description}")
    
${code}
    
    
    `;

    return stepCode;
  }
}
