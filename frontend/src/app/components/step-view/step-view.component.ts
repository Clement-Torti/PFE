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

  getRowCount(text: string): number {
    const maxCharsPerRow = 50; // Maximum number of characters per row
    const defaultRowCount = 1; // Default number of rows

    const textLength = text.length;
    const rowCount = Math.ceil(textLength / maxCharsPerRow);

    return Math.max(rowCount, defaultRowCount);
  }
}
