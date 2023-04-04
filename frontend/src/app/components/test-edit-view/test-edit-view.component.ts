import { Component } from '@angular/core';

import { FolderService } from 'src/app/services/folder.service';
import { TaskService } from 'src/app/services/task.service';

import { File } from 'src/app/models/file';
import { Test } from 'src/app/models/test';
import { DeviceType } from 'src/app/models/deviceType';
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
  showCode = false;

  // Device combobox
  isDeviceTypeTest = false;
  deviceTypes = Object.values(DeviceType);
  selectedDeviceType: DeviceType | null = null;

  constructor(
    private folderService: FolderService,
    private taskService: TaskService
  ) {
    this.folderService.selectedFile$.subscribe((file) => {
      this.selectedFile = file;
      this.isDeviceTypeTest = this.test.deviceType !== null;
      this.selectedDeviceType = this.test.deviceType;
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

  onDeviceCheckboxSelectionChange(e: any) {
    const checked = e.target.checked;

    if (!checked) {
      this.selectedDeviceType = null;
      this.test.deviceType = null;
      this.test.deviceName = '';
    }
  }

  onDeviceTypeSelectionChange(deviceType: DeviceType) {
    this.test.deviceType = deviceType;
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
