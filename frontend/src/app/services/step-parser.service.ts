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
      console.log(newStep);

      newStep.params.push({
        name: match[1],
        type: match[2] as ParamType,
        value: '',
      });
    }
    return newStep;
  }
}
