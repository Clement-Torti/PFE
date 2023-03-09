import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Folder } from 'src/app/models/folder';
import { TaskService } from 'src/app/services/task.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main-windows',
  templateUrl: './main-windows.component.html',
  styleUrls: ['./main-windows.component.css'],
})
export class MainWindowsComponent {
  files?: FileList;
  folder?: Folder;
  //files?: File[];
  folderOpen = false;
  url = '';

  constructor(
    private router: Router,
    private taskService: TaskService,
    private cookieService: CookieService
  ) {
    // Retrieve the current folder on cookie
    if (this.cookieService.check('current-folder')) {
      this.folderOpen = true;
      const folderId = this.cookieService.get('current-folder');
      this.taskService.getFolder(folderId).subscribe((folder) => {
        this.folder = folder as Folder;
      });
    }

    this.url = router.url;
    if (this.url != '/' && !this.folderOpen) {
      this.router.navigate(['/']);
    }
  }

  onOpenFiles(files: any) {
    this.files = files;

    if (this.files!.length > 0) {
      const folderTitle = this.files![0].webkitRelativePath.split('/')[0] + '/';

      // Create the folder in local db
      this.taskService.postFolder(folderTitle).subscribe((folder) => {
        this.folder = folder as Folder;
        this.folderOpen = true;
        this.cookieService.set('current-folder', this.folder!._id);
      });
    }
  }

  onOpenFolder(folder: Folder) {
    this.folder = folder;
    this.folderOpen = true;
    this.cookieService.set('current-folder', folder._id);
  }
}
