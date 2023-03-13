import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FolderService } from 'src/app/services/folder.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main-windows',
  templateUrl: './main-windows.component.html',
  styleUrls: ['./main-windows.component.css'],
})
export class MainWindowsComponent {
  url = '';

  constructor(
    private router: Router,
    private folderService: FolderService,
    private cookieService: CookieService
  ) {
    // remove cookie
    // this.cookieService.delete('current-folder');

    this.url = router.url;
    // Redirect to home if no folder is selected
    if (this.url != '/' && !this.folderService.getFolder()) {
      this.router.navigate(['/']);
    }
  }
}
