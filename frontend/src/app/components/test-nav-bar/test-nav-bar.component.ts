import { Component } from '@angular/core';
import { FolderService } from 'src/app/services/folder.service';
import { TaskService } from 'src/app/services/task.service';
import { TestParserService } from 'src/app/services/test-parser.service';

import { File } from 'src/app/models/file';

import { EMPTY_TEST } from 'src/app/mocks/test-mock';

@Component({
  selector: 'app-test-nav-bar',
  templateUrl: './test-nav-bar.component.html',
  styleUrls: ['./test-nav-bar.component.css'],
})
export class TestNavBarComponent {
  files: File[] = [];

  constructor(
    private folderService: FolderService,
    private taskService: TaskService,
    private testParserService: TestParserService
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
      const code = this.testParserService.generateCode(EMPTY_TEST);
      this.taskService
        .postFile(folder._id, 'newFile', code)
        .subscribe((file) => {
          this.folderService.getFiles();
        });
    }
  }
}
