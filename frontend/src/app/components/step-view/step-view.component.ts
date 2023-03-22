import { Component, Input, OnInit } from '@angular/core';
import { Step } from 'src/app/models/step';

@Component({
  selector: 'app-step-view',
  templateUrl: './step-view.component.html',
  styleUrls: ['./step-view.component.css'],
})
export class StepViewComponent implements OnInit {
  @Input()
  step!: Step;

  ngOnInit(): void {
    console.log(this.step);
  }
}
