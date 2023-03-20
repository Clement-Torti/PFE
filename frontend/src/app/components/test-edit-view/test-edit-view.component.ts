import { Component } from '@angular/core';
import { FolderService } from 'src/app/services/folder.service';
import { File } from 'src/app/models/file';

@Component({
  selector: 'app-test-edit-view',
  templateUrl: './test-edit-view.component.html',
  styleUrls: ['./test-edit-view.component.css'],
})
export class TestEditViewComponent {
  selectedFile: File | null = null;

  constructor(private folderService: FolderService) {
    this.folderService.selectedFile$.subscribe((file) => {
      this.selectedFile = file;
    });
  }
}
