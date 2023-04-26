import { Component } from '@angular/core';
import { Step } from 'src/app/models/step';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'app-step-creation-view',
  templateUrl: './step-creation-view.component.html',
  styleUrls: ['./step-creation-view.component.css'],
})
export class StepCreationViewComponent {
  selectedStep: Step | null = null;

  constructor(private stepService: StepService) {
    this.stepService.selectedStep$.subscribe((step) => {
      this.selectedStep = step;
      console.log('Selected step', step);
    });
  }

  onReturn() {
    console.log('Return');
  }

  onSave() {
    console.log('Save');
  }

  onAddParam() {
    console.log('Param added');
  }

  onDeleteStep() {
    console.log('Step deleted');
  }
}
