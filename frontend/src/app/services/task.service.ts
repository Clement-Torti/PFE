import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private webService: WebService) {}

  getFolders() {
    return this.webService.get('folders');
  }

  getFolder(folderId: string) {
    return this.webService.get(`folders/${folderId}`);
  }

  postFolder(title: string) {
    return this.webService.post('folders', { title });
  }

  getFiles(folderId: string) {
    return this.webService.get(`folders/${folderId}/files`);
  }
}
