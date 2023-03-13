import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Folder } from 'src/app/models/folder';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css'],
})
export class HomeViewComponent implements OnInit {
  folders: Folder[] = [];

  constructor(
    private taskService: TaskService,
    private folderService: FolderService
  ) {}

  ngOnInit(): void {
    this.taskService.getFolders().subscribe((folders) => {
      this.folders = folders as Folder[];
    });
  }

  selectDirectory(files: any) {
    this.folderService.importFolder(files);
  }

  onFolderSelected(folder: Folder) {
    this.folderService.setFolder(folder._id);
  }
}
