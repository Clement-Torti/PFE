import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() folderOpen = false;
  @Input() folderName = '';
  @Output() openFolderClicked = new EventEmitter<any>();

  selectDirectory(files: any) {
    this.openFolderClicked.emit(files);
  }
}
