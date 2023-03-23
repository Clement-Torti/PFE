import { Component } from '@angular/core';
import { FolderService } from 'src/app/services/folder.service';
import { TaskService } from 'src/app/services/task.service';

import { File } from 'src/app/models/file';

@Component({
  selector: 'app-test-nav-bar',
  templateUrl: './test-nav-bar.component.html',
  styleUrls: ['./test-nav-bar.component.css'],
})
export class TestNavBarComponent {
  files: File[] = [];

  constructor(
    private folderService: FolderService,
    private taskService: TaskService
  ) {
    this.folderService.files$.subscribe((files) => {
      this.files = files;
    });

    this.folderService.getFiles();
  }

  onFileClick(file: File) {
    this.folderService.setSelectedFile(file._id);
  }

  onAddFileClick() {
    const folder = this.folderService.getFolder();

    if (folder) {
      this.taskService.postFile(folder._id, 'newFile', '').subscribe((file) => {
        this.folderService.getFiles();
      });
    }
  }
}
