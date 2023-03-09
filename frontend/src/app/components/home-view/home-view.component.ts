import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Folder } from 'src/app/models/folder';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css'],
})
export class HomeViewComponent implements OnInit {
  @Output() openFolderClicked = new EventEmitter<any>();
  @Output() folderClicked = new EventEmitter<Folder>();

  folders: Folder[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getFolders().subscribe((folders) => {
      this.folders = folders as Folder[];
    });
  }

  selectDirectory(files: any) {
    this.openFolderClicked.emit(files);
  }

  onFolderSelected(folder: Folder) {
    this.folderClicked.emit(folder);
  }
}
