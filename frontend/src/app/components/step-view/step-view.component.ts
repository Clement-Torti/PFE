import { Component, Input } from '@angular/core';
import { Step } from 'src/app/models/step';

@Component({
  selector: 'app-step-view',
  templateUrl: './step-view.component.html',
  styleUrls: ['./step-view.component.css'],
})
export class StepViewComponent {
  @Input()
  step!: Step;
  @Input()
  index!: number;
}
