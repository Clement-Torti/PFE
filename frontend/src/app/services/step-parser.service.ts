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

  generateStep(
    steps: Step[],
    stepNumber: number,
    PYTHON_INDENT: string
  ): string {
    let stepCode = `${PYTHON_INDENT}def step${stepNumber}(self):
${PYTHON_INDENT}${PYTHON_INDENT}print("Step${stepNumber}:\\n")
${PYTHON_INDENT}${PYTHON_INDENT}result = 0
${PYTHON_INDENT}${PYTHON_INDENT}stepNumber = ${stepNumber}
`;

    for (const step of steps) {
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

      stepCode += `${PYTHON_INDENT}${PYTHON_INDENT}
${PYTHON_INDENT}${PYTHON_INDENT}${stepDescription}
${PYTHON_INDENT}${PYTHON_INDENT}self.logScenario("Step ${stepNumber}", "${step.title}", "${step.description}")
    
${code}
${PYTHON_INDENT}${PYTHON_INDENT}
`;
    }

    stepCode += `${PYTHON_INDENT}${PYTHON_INDENT}return result`;

    return stepCode;
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

  async parseStepDescription(description: string): Promise<Step | null> {
    const components = description.split('__');
    if (components.length < 2) {
      return null;
    }

    const id = components[1];
    const params = components.slice(2);

    const step = (await firstValueFrom(this.taskService.getStep(id))) as Step;
    if (!step) {
      console.log("Can't find Step with id: ", id);
      return null;
    }
    step.params = [];

    for (const param of params) {
      const re = /(.+)\((.+)\):(.+)/;
      const match = param.match(re);

      if (!match || match.length !== 4) {
        console.log(
          'Bad format: Unexpected param format in step description: ' + param
        );
        return null;
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

  async parseActions(code: string[], actions: any[]): Promise<string[]> {
    while (code.length > 0 && code[0] !== '') {
      const action = await this.parseStepDescription(code[0]);
      if (action) {
        actions.push(action);
      }
      code = this.parseNextLine(code);
    }

    return new Promise<string[]>((resolve, reject) => {
      resolve(this.parseNextLine(code));
    });
  }

  async parseSteps(code: string[]): Promise<Step[][]> {
    const steps: Step[][] = [];
    const stepRegex = /def step(\d+)\(self\):/g;
    let stepMatch = stepRegex.exec(code[0]);
    let groupIndex = 0;
    let stepIndex = 0;

    while (stepMatch) {
      steps.push([]);
      code = this.parseNextLine(code);

      // eslint-disable-next-line prefer-const
      let actions: any[] = [];
      code = await this.parseActions(code, actions);

      for (const action of actions) {
        action.index = stepIndex;
        action.groupIndex = groupIndex;
        steps[groupIndex].push(action as Step);

        stepIndex += 1;
      }

      const stepRegex = /def step(\d+)\(self\):/g;
      stepMatch = stepRegex.exec(code[0]);
      groupIndex += 1;
      stepIndex = 0;
    }

    return steps;
  }
}
