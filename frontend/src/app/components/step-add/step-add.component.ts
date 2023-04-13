import { Component, Output, EventEmitter } from '@angular/core';
import { Step } from 'src/app/models/step';
import { StepType } from 'src/app/models/stepType';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'app-step-add',
  templateUrl: './step-add.component.html',
  styleUrls: ['./step-add.component.css'],
})
export class StepAddComponent {
  @Output() buttonClick = new EventEmitter<Step>();

  selectedStep: Step | null = null;
  stepTypes: StepType[] = [];

  constructor(private stepService: StepService) {
    this.stepTypes = this.stepService.getStepType();
  }

  getStepsByType(stepType: StepType): Step[] {
    return this.stepService.getStepsByType(stepType);
  }

  onStepSelectionChange(e: Event) {
    console.log('Selected step: ' + (e.target as HTMLSelectElement).value);
  }

  onCreateStepClick() {
    console.log('Create step');
  }
}
