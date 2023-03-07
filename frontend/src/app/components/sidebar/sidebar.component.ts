import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() folderOpen = false;
  @Output() editClicked = new EventEmitter<void>();
  @Output() runClicked = new EventEmitter<void>();

  selectDirectory(files: any) {
    // this.files = files;
    // this.folderOpen = true;
  }

  onEditClicked() {
    this.editClicked.emit();
  }

  onRunClicked() {
    this.runClicked.emit();
  }
}
