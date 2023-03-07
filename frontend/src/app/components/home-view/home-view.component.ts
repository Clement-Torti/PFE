import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css'],
})
export class HomeViewComponent {
  @Output() openFolderClicked = new EventEmitter<any>();

  selectDirectory(files: any) {
    this.openFolderClicked.emit(files);
  }
}
