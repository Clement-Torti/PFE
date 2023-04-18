import { Component } from '@angular/core';

import { Step } from 'src/app/models/step';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'app-step-nav-bar',
  templateUrl: './step-nav-bar.component.html',
  styleUrls: ['./step-nav-bar.component.css'],
})
export class StepNavBarComponent {
  steps: Step[] = [];

  constructor(private stepService: StepService) {
    this.stepService.steps$.subscribe((steps) => {
      this.steps = steps;
    });

    this.stepService.getSteps();
  }

  onStepClick(step: Step) {
    this.stepService.setSelectedStep(step._id);
  }

  onAddStepClick() {
    console.log('Add step');
    // this.taskService.postFile(folder._id, 'newFile', code).subscribe((file) => {
    //   this.folderService.getFiles();
    // });
  }
}
