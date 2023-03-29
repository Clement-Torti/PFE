import { Component, Input } from '@angular/core';
import { HighlightLoader } from 'ngx-highlightjs';

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.css'],
})
export class CodeViewComponent {
  @Input() code = '';
  constructor(private hljsLoader: HighlightLoader) {}
}
