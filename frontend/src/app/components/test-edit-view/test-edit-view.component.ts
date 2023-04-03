import { Component } from '@angular/core';

import { FolderService } from 'src/app/services/folder.service';
import { TaskService } from 'src/app/services/task.service';

import { File } from 'src/app/models/file';
import { Test } from 'src/app/models/test';
import { MOCKED_TEST } from 'src/app/mocks/test-mock';
import { MOCKED_STEP } from 'src/app/mocks/step-mock';

@Component({
  selector: 'app-test-edit-view',
  templateUrl: './test-edit-view.component.html',
  styleUrls: ['./test-edit-view.component.css'],
})
export class TestEditViewComponent {
  selectedFile: File | null = null;
  test: Test = MOCKED_TEST;
  inputName = '';
  showCode = false;

  constructor(
    private folderService: FolderService,
    private taskService: TaskService
  ) {
    this.folderService.selectedFile$.subscribe((file) => {
      this.selectedFile = file;
    });
  }

  onGenerateCodeClick() {
    const folder = this.folderService.getFolder();

    if (folder && this.selectedFile) {
      this.taskService
        .updateFile(
          folder._id,
          this.selectedFile._id,
          this.selectedFile.title,
          this.selectedFile.content
        )
        .subscribe(() => {
          this.folderService.getFiles();
        });
    }

    this.showCode = true;
  }

  onDeleteTestClick() {
    const folder = this.folderService.getFolder();
    if (folder && this.selectedFile) {
      this.taskService
        .deleteFile(folder._id, this.selectedFile!._id)
        .subscribe(() => {
          this.selectedFile = null;
          this.folderService.getFiles();
        });
    }
  }

  onAddStepClick() {
    this.test.steps.push(MOCKED_STEP);
  }

  onMoveStepClick(index: number) {
    if (index < this.test.steps.length - 1) {
      const step = this.test.steps[index];
      this.test.steps[index] = this.test.steps[index + 1];
      this.test.steps[index + 1] = step;
    }
  }

  onDeleteStepClick(index: number) {
    this.test.steps.splice(index, 1);
  }

  onCloseCodeClick() {
    this.showCode = false;
  }
}
