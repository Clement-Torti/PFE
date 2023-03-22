import { Component } from '@angular/core';
import { FolderService } from 'src/app/services/folder.service';
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

  constructor(private folderService: FolderService) {
    this.folderService.selectedFile$.subscribe((file) => {
      this.selectedFile = file;
    });
  }

  onGenerateCodeClick() {
    console.log('onGenerateCodeClick');
  }

  onDeleteTestClick() {
    console.log('onDeleteTestClick');
  }

  onAddStepClick() {
    console.log('onAddStepClick');
  }

  onMoveStepClick(step: Step) {
    console.log('onMoveStepClick: ', step);
  }

  onDeleteStepClick(step: Step) {
    console.log('onMoveStepClick: ', step);
  }
}
