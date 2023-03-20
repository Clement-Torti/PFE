import { Component } from '@angular/core';
import { FolderService } from 'src/app/services/folder.service';
import { File } from 'src/app/models/file';

@Component({
  selector: 'app-test-nav-bar',
  templateUrl: './test-nav-bar.component.html',
  styleUrls: ['./test-nav-bar.component.css'],
})
export class TestNavBarComponent {
  files: File[] = [];

  constructor(private folderService: FolderService) {
    this.folderService.files$.subscribe((files) => {
      this.files = files;
    });

    this.folderService.getFiles();
  }

  onFileClick(file: File) {
    this.folderService.setSelectedFile(file._id);
  }

  onAddFileClick() {
    console.log('onAddFileClick');
  }
}
