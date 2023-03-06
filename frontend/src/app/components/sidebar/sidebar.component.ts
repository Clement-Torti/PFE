import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() folderOpen = false;

  selectDirectory(files: any) {
    // this.files = files;
    // this.folderOpen = true;
  }
}
