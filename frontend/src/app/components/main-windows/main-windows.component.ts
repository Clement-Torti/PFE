import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-windows',
  templateUrl: './main-windows.component.html',
  styleUrls: ['./main-windows.component.css'],
})
export class MainWindowsComponent {
  files?: FileList;
  folderName = '';
  folderOpen = false;
  url = '';

  constructor(private router: Router) {
    this.url = router.url;
    if (this.url != '/' && !this.folderOpen) {
      this.router.navigate(['/']);
    }
  }

  onOpenFolder(files: any) {
    this.files = files;
    this.folderOpen = true;

    if (this.files!.length > 0) {
      this.folderName = this.files![0].webkitRelativePath.split('/')[0] + '/';
    }

    // const fileReader = new FileReader();
    // fileReader.onload = (_) => {
    //   console.log(fileReader.result);
    // };
    // fileReader.readAsText(this.files![0]);
  }
}
