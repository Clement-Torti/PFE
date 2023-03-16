import { Injectable } from '@angular/core';
import { Folder } from '../models/folder';
import { File } from '../models/file';
import { TaskService } from './task.service';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  private _folder = new BehaviorSubject<Folder | null>(null);
  public folder$ = this._folder.asObservable();

  private _files = new BehaviorSubject<File[]>([]);
  public files$ = this._files.asObservable();

  constructor(
    private cookieService: CookieService,
    private taskService: TaskService
  ) {}

  // Function returning an opcional folder
  getFolder(): Folder | null {
    // Check if folder is already set
    if (this._folder.value != null) {
      return this._folder.value;
    }

    // Retrieve the current folder on cookie
    if (this.cookieService.check('current-folder')) {
      const folderId = this.cookieService.get('current-folder');
      this.setFolder(folderId);
    }

    return null;
  }

  setFolder(folderId: string) {
    this.cookieService.set('current-folder', folderId);

    this.taskService.getFolder(folderId).subscribe((folder) => {
      this._folder.next(folder as Folder);
    });
  }

  importFolder(files: any[]) {
    console.log('FolderService.importFolder()', files);

    if (files.length > 0) {
      const folderTitle = files[0].webkitRelativePath.split('/')[0] + '/';
      // Create the folder in local db
      this.taskService.postFolder(folderTitle).subscribe((folder) => {
        const theFolder = folder as Folder;
        this.setFolder(theFolder._id);

        // Create files in local db
        // for (const i in files) {
        //   file = {
        //     title: files[i]['name'],
        //     _folderId: theFolder._id,
        //     content: files[i][content],
        //   };
        //   this.folderService.postFile(file);
        // }
      });
    }
  }

  getFiles(): File[] {
    if (this._folder.value != null) {
      this.taskService.getFiles(this._folder.value._id).subscribe((files) => {
        console.log(
          'FolderService.getFiles()',
          this._folder!.value!._id,
          files
        );

        this._files.next(files as File[]);
      });
    }

    return [];
  }
}
