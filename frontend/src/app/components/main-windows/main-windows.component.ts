import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-main-windows',
  templateUrl: './main-windows.component.html',
  styleUrls: ['./main-windows.component.css'],
})
export class MainWindowsComponent implements OnInit {
  url = '';

  constructor(private router: Router, private folderService: FolderService) {
    this.url = router.url;
    // Redirect to home if no folder is selected
    if (this.url != '/' && !this.folderService.getFolder()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    console.log('MainWindowsComponent.ngOnInit()');
  }
}
