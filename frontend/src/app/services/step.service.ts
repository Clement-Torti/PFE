import { Injectable } from '@angular/core';
import { StepType } from '../models/stepType';

import { Step } from '../models/step';
import { BOOT_STEPS } from '../mocks/step-mock';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  getStepType(): StepType[] {
    return Object.values(StepType);
  }

  getSteps(): Step[] {
    return BOOT_STEPS;
  }

  getStepsByType(stepType: StepType): Step[] {
    return BOOT_STEPS.filter((step) => step.stepType === stepType);
  }
}
