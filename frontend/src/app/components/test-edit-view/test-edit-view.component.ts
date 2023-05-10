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
  stepGroups: Step[][] = [];
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
    this.testParserService
      .parseFile(this.selectedFile!.content)
      .then((test) => {
        this.test = test;
        this.isDeviceTypeTest = this.test.deviceType !== null;
        this.selectedDeviceType = this.test.deviceType;
        this.badFormat = false;
        this.stepToStepGroup(this.test.steps);
      })
      .catch((e) => {
        this.badFormat = true;
        this.errorMessage = (e as Error).message;
      });
  }

  private stepToStepGroup(steps: Step[]): Step[][] {
    const stepGroups: Step[][] = [];

    for (let i = 0; i < steps.length; i++) {
      stepGroups[steps[i].groupIndex].push(steps[i]);
    }

    return stepGroups;
  }

  private stepGroupToStep(stepGroups: Step[][]): Step[] {
    const steps: Step[] = [];

    for (let i = 0; i < stepGroups.length; i++) {
      for (let j = 0; j < stepGroups[i].length; j++) {
        const newStep = { ...stepGroups[i][j] };
        newStep.groupIndex = i;
        newStep.index = j;
        steps.push(newStep as Step);
      }
    }

    return steps;
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
      // Update the test's steps to match stepGroups
      this.test.steps = this.stepGroupToStep(this.stepGroups);
      console.log(this.test.steps);

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
    const newStep = { ...step }; // create a copy of the step object using the spread operator
    newStep.index = this.test?.steps.length;
    // Group index is already defined in step

    if (!this.stepGroups[newStep.groupIndex]) {
      this.stepGroups[newStep.groupIndex] = [];
    }

    this.stepGroups[newStep.groupIndex].push(newStep as Step);
    this.test?.steps.push(newStep as Step);
  }

  onAddStepGroupClick() {
    this.stepGroups.push([]);
  }

  onMoveStepClick(groupIndex: number, index: number) {
    const step = this.stepGroups[groupIndex][index];
    this.stepGroups[groupIndex][index] = this.stepGroups[groupIndex][index + 1];
    this.stepGroups[groupIndex][index + 1] = step;
  }

  onDeleteStepGroupClick(index: number) {
    this.stepGroups.splice(index, 1);
  }

  onDeleteStepClick(groupIndex: number, stepIndex: number) {
    this.stepGroups[groupIndex].splice(stepIndex, 1);
    // this.test?.steps.splice(index, 1);
  }

  onCloseCodeClick() {
    this.showCode = false;
  }
}
