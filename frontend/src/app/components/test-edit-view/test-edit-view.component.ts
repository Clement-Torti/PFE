import { Component } from '@angular/core';

import { FolderService } from 'src/app/services/folder.service';
import { TaskService } from 'src/app/services/task.service';
import { TestParserService } from 'src/app/services/test-parser.service';

import { File } from 'src/app/models/file';
import { Test } from 'src/app/models/test';
import { DeviceType } from 'src/app/models/deviceType';
import { MOCKED_TEST } from 'src/app/mocks/test-mock';
import { MOCKED_STEP } from 'src/app/mocks/step-mock';
import { Step } from 'src/app/models/step';

@Component({
  selector: 'app-test-edit-view',
  templateUrl: './test-edit-view.component.html',
  styleUrls: ['./test-edit-view.component.css'],
})
export class TestEditViewComponent {
  selectedFile: File | null = null;
  test: Test | null = null;
  showCode = false;
  badFormat = false;
  errorMessage = '';

  // Device combobox
  isDeviceTypeTest = false;
  deviceTypes = Object.values(DeviceType);
  selectedDeviceType: DeviceType | null = null;

  constructor(
    private folderService: FolderService,
    private taskService: TaskService,
    private testParserService: TestParserService
  ) {
    this.folderService.selectedFile$.subscribe((file) => {
      if (this.selectedFile !== file) {
        this.selectedFile = file;
        this.setupTest();
      }
    });

    if (this.selectedFile) {
      // TODO exception handling
      this.setupTest();
    }
  }

  setupTest() {
    try {
      this.testParserService
        .parseFile(this.selectedFile!.content)
        .then((test) => {
          this.test = test;
          this.isDeviceTypeTest = this.test.deviceType !== null;
          this.selectedDeviceType = this.test.deviceType;
          this.badFormat = false;
        });
    } catch (e) {
      this.badFormat = true;
      this.errorMessage = (e as Error).message;
    }
  }

  onSaveCode() {
    this.taskService
      .updateFile(
        this.folderService.getFolder()!._id,
        this.selectedFile!._id,
        this.selectedFile!.title,
        this.selectedFile!.content
      )
      .subscribe(() => {
        this.folderService.getFiles();
        this.setupTest();
      });
  }

  onGenerateCodeClick() {
    const folder = this.folderService.getFolder();

    if (folder && this.selectedFile && this.test) {
      const content = this.testParserService.generateCode(this.test);

      this.taskService
        .updateFile(
          folder._id,
          this.selectedFile._id,
          this.selectedFile.title,
          content
        )
        .subscribe(() => {
          this.folderService.getFiles();
        });
    }

    this.showCode = true;
  }

  onTestNameChange(e: any) {
    if (this.test) {
      this.test.title = e.target.value;
    }
  }

  onDeviceCheckboxSelectionChange(e: any) {
    const checked = e.target.checked;

    if (!checked && this.test) {
      this.selectedDeviceType = null;
      this.test.deviceType = null;
      this.test.deviceName = '';
    }
  }

  onDeviceTypeSelectionChange(deviceType: DeviceType) {
    if (this.test) {
      this.test.deviceType = deviceType;
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

  onAddStepClick(step: any) {
    this.test?.steps.push(step as Step);
  }

  onMoveStepClick(index: number) {
    if (this.test && index < this.test.steps.length - 1) {
      const step = this.test?.steps[index];
      this.test.steps[index] = this.test.steps[index + 1];
      this.test.steps[index + 1] = step;
    }
  }

  onDeleteStepClick(index: number) {
    this.test?.steps.splice(index, 1);
  }

  onCloseCodeClick() {
    this.showCode = false;
  }
}
