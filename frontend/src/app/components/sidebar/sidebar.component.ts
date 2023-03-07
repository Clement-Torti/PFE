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
  @Output() editClicked = new EventEmitter<void>();
  @Output() runClicked = new EventEmitter<void>();

  selectDirectory(files: any) {
    this.openFolderClicked.emit(files);
  }

  onEditClicked() {
    this.editClicked.emit();
  }

  onRunClicked() {
    this.runClicked.emit();
  }
}
