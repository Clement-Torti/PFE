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
    let description = '# ' + step._id + ' ';
    for (const param of step.params) {
      let val = param.value;
      if (param.type === ParamType.STRING) {
        val = `"${param.value}"`;
      }
      description += `${param.name}(${param.type}):${val} `;
    }

    // Parse the description to get the step
    this.parseStepDescription(description).then((step) => {
      console.log(step);
    });

    return description;
  }

  async parseStepDescription(description: string): Promise<Step> {
    const components = description.split(' ');
    const id = components[1];
    const params = components.slice(2);
    console.log(params);

    const step = (await firstValueFrom(this.taskService.getStep(id))) as Step;
    step.params = [];

    for (const param of params) {
      const re = /(.+)\((.+)\):(.+)/;
      const match = param.match(re);
      console.log(match);

      if (!match || match.length !== 4) {
        throw new Error(
          'Bad format: Unexpected param format in step description: ' + param
        );
      }

      step.params.push({
        name: match![1],
        type: match![2] as ParamType,
        value: match![3],
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
}
