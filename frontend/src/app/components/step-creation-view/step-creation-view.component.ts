import { Component } from '@angular/core';
import { ParamType } from 'src/app/models/param';
import { Step } from 'src/app/models/step';
import { StepType } from 'src/app/models/stepType';
import { StepService } from 'src/app/services/step.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-step-creation-view',
  templateUrl: './step-creation-view.component.html',
  styleUrls: ['./step-creation-view.component.css'],
})
export class StepCreationViewComponent {
  selectedStep: Step | null = null;
  selectedStepType: StepType | null = null;
  paramName = '';
  paramType: ParamType | null = null;

  constructor(
    private stepService: StepService,
    private taskService: TaskService
  ) {
    this.stepService.selectedStep$.subscribe((step) => {
      this.selectedStep = step;
      this.selectedStepType = step?.stepType ?? null;
    });
  }

  getStepTypes(): StepType[] {
    return this.stepService.getStepType();
  }

  onStepTypeSelectionChange(stepType: StepType) {
    if (this.selectedStep) {
      this.selectedStep.stepType = stepType;
    }
  }

  onReturn() {
    console.log('Return');
  }

  onSave() {
    if (this.selectedStep) {
      this.taskService.updateStep(this.selectedStep).subscribe(() => {
        console.log('Step updated');
      });
    }
  }

  getParamTypes(): ParamType[] {
    return Object.values(ParamType);
  }

  onParamTypeSelectionChange(paramType: ParamType) {
    this.paramType = paramType;
  }

  onAddParam() {
    if (this.selectedStep && this.paramType && this.paramName) {
      this.selectedStep.code =
        this.selectedStep.code + `\\~${this.paramName}: ${this.paramType}~\\`;

      this.paramType = null;
      this.paramName = '';
    }
  }

  onDeleteStep() {
    if (this.selectedStep) {
      this.taskService.deleteStep(this.selectedStep._id).subscribe(() => {
        this.selectedStep = null;
        this.stepService.getSteps();
      });
    }
  }
}
