import { Component } from '@angular/core';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  _folderName = '';
  _folderOpen = false;

  constructor(private folderService: FolderService) {
    const folder = this.folderService.getFolder();

    this.folderService.folder$?.subscribe((folder) => {
      if (folder) {
        this._folderName = folder.title;
        this._folderOpen = true;
      } else {
        this._folderName = '';
        this._folderOpen = false;
      }
    });
  }

  selectDirectory(files: any) {
    this.folderService.importFolder(files);
  }
}
