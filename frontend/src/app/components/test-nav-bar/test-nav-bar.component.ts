import { Component } from '@angular/core';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-test-nav-bar',
  templateUrl: './test-nav-bar.component.html',
  styleUrls: ['./test-nav-bar.component.css'],
})
export class TestNavBarComponent {
  private _files: File[] = [];

  constructor(private folderService: FolderService) {
    this.folderService.files$.subscribe((files) => {
      console.log('TestNavBarComponent.files$', files);
      //this._files = files;
    });

    this.folderService.getFiles();
  }
}
