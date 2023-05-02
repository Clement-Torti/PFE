import { Component } from '@angular/core';
import { Step } from 'src/app/models/step';
import { StepService } from 'src/app/services/step.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-step-creation-view',
  templateUrl: './step-creation-view.component.html',
  styleUrls: ['./step-creation-view.component.css'],
})
export class StepCreationViewComponent {
  selectedStep: Step | null = null;

  constructor(
    private stepService: StepService,
    private taskService: TaskService
  ) {
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
    if (this.selectedStep) {
      this.taskService.deleteStep(this.selectedStep._id).subscribe(() => {
        this.selectedStep = null;
        this.stepService.getSteps();
      });
    }
  }
}
