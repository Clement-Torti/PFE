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

  private _selectedFile = new BehaviorSubject<File | null>(null);
  public selectedFile$ = this._selectedFile.asObservable();

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
    console.log('importFolder', files);

    if (files.length > 0) {
      const folderTitle = files[0].webkitRelativePath.split('/')[0] + '/';
      // Create the folder in local db
      this.taskService.postFolder(folderTitle).subscribe((folder) => {
        const theFolder = folder as Folder;
        this.setFolder(theFolder._id);

        // Create files in local db
        for (const file of files) {
          const fileReader = new FileReader();
          fileReader.onload = (e) => {
            const content = fileReader.result as string;
            this.taskService
              .postFile(theFolder._id, file['name'], content)
              .subscribe(() => {
                // File uploaded successfully
              });
          };
          fileReader.readAsText(file);
        }
      });
    }
  }

  getFiles(): File[] {
    if (this._folder.value) {
      this.taskService.getFiles(this._folder.value._id).subscribe((files) => {
        this._files.next(files as File[]);
      });
    }

    return [];
  }

  setSelectedFile(fileId: string) {
    const file = this._files.value.find((file) => file._id === fileId);
    if (file) {
      this._selectedFile.next(file);
    }
  }

  getSelectedFile(): File | null {
    return this._selectedFile.value;
  }
}
