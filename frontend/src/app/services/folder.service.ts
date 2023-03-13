import { Injectable } from '@angular/core';
import { Folder } from '../models/folder';
import { TaskService } from './task.service';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  private _folder = new BehaviorSubject<Folder | undefined>(undefined);
  public folder$ = this._folder.asObservable();

  constructor(
    private cookieService: CookieService,
    private taskService: TaskService
  ) {}

  // Function returning an opcional folder
  getFolder(): Folder | undefined {
    // Check if folder is already set
    if (this._folder.value != undefined) {
      return this._folder.value;
    }

    // Retrieve the current folder on cookie
    if (this.cookieService.check('current-folder')) {
      const folderId = this.cookieService.get('current-folder');
      this.setFolder(folderId);
    }

    return undefined;
  }

  setFolder(folderId: string) {
    this.cookieService.set('current-folder', folderId);

    this.taskService.getFolder(folderId).subscribe((folder) => {
      this._folder.next(folder as Folder);
    });
  }

  importFolder(files: any[]) {
    if (files.length > 0) {
      const folderTitle = files[0].webkitRelativePath.split('/')[0] + '/';
      // Create the folder in local db
      this.taskService.postFolder(folderTitle).subscribe((folder) => {
        const theFolder = folder as Folder;
        this.setFolder(theFolder._id);
      });
    }
  }
}
