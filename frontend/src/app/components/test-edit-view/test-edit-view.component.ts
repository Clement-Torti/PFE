import { Component } from '@angular/core';
import { FolderService } from 'src/app/services/folder.service';
import { TaskService } from 'src/app/services/task.service';
import { File } from 'src/app/models/file';
import { Test } from 'src/app/models/test';
import { Step } from 'src/app/models/step';
import { MOCKED_TEST } from 'src/app/mocks/test-mock';

@Component({
  selector: 'app-test-edit-view',
  templateUrl: './test-edit-view.component.html',
  styleUrls: ['./test-edit-view.component.css'],
})
export class TestEditViewComponent {
  selectedFile: File | null = null;
  test: Test = MOCKED_TEST;
  inputName = '';

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
    console.log('onAddStepClick');
  }

  onMoveStepClick(step: Step) {
    console.log('onMoveStepClick: ', step);
  }

  onDeleteStepClick(step: Step) {
    console.log('onDeleteStepClick: ', step);
  }
}
