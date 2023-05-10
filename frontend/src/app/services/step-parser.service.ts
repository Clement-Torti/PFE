import { Injectable } from '@angular/core';
import { Step } from '../models/step';
import { ParamType } from '../models/param';
import { TaskService } from './task.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepParserService {
  constructor(private taskService: TaskService) {}

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

  generateStepDescription(step: Step): string {
    let description = '#__' + step._id + '__';
    for (const param of step.params) {
      let val = param.value;
      if (param.type === ParamType.STRING) {
        val = `"${param.value}"`;
      }
      description += `${param.name}(${param.type}):${val}__`;
    }

    description = description.slice(0, -2);

    return description;
  }

  async parseStepDescription(description: string): Promise<Step> {
    const components = description.split('__');
    const id = components[1];
    const params = components.slice(2);

    const step = (await firstValueFrom(this.taskService.getStep(id))) as Step;
    step.params = [];

    for (const param of params) {
      const re = /(.+)\((.+)\):(.+)/;
      const match = param.match(re);

      if (!match || match.length !== 4) {
        throw new Error(
          'Bad format: Unexpected param format in step description: ' + param
        );
      }

      const paramName = match![1];
      const paramType = match![2] as ParamType;
      let paramValue = match![3];
      if (paramType === ParamType.STRING) {
        paramValue = paramValue.replace(/"/g, '');
      }

      step.params.push({
        name: paramName,
        type: paramType,
        value: paramValue,
      });
    }

    return step;
  }

  generateStep(step: Step, stepNumber: number, PYTHON_INDENT: string): string {
    const stepDescription = this.generateStepDescription(step);

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
${PYTHON_INDENT}${PYTHON_INDENT}${stepDescription}
${PYTHON_INDENT}${PYTHON_INDENT}self.logScenario("Step ${stepNumber}: ", "${step.title}", "${step.description}")
    
${code}
    
    
`;

    return stepCode;
  }

  async parseSteps(code: string[], PYTHON_INDENT: string): Promise<Step[]> {
    const steps = [];
    const stepRegex = /def step(\d+)\(self\):/g;
    let stepMatch = stepRegex.exec(code[0]);

    while (stepMatch) {
      code = this.parseNextLine(code);

      const step = await this.parseStepDescription(code[0].trim());

      code = this.parseStepCode(code, PYTHON_INDENT); // Remove lines corresponding to the step

      steps.push(step);

      const stepRegex = /def step(\d+)\(self\):/g;
      stepMatch = stepRegex.exec(code[0]);
    }

    return steps;
  }

  private parseStepCode(code: string[], PYTHON_INDENT: string): string[] {
    while (
      code[0].startsWith(PYTHON_INDENT.repeat(2)) ||
      code[0].trim() == ''
    ) {
      code = this.parseNextLine(code);
    }

    return code;
  }
}
