import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private webService: WebService) {}

  // Folder methods
  getFolders() {
    return this.webService.get('folders');
  }

  getFolder(folderId: string) {
    return this.webService.get(`folders/${folderId}`);
  }

  postFolder(title: string) {
    return this.webService.post('folders', { title });
  }

  // Files methods
  getFiles(folderId: string) {
    return this.webService.get(`folders/${folderId}/files`);
  }

  postFile(folderId: string, title: string, content: string) {
    return this.webService.post(`folders/${folderId}/files`, {
      title,
      content,
    });
  }

  updateFile(folderId: string, fileId: string, title: string, content: string) {
    return this.webService.put(`folders/${folderId}/files/${fileId}`, {
      title,
      content,
    });
  }

  deleteFile(folderId: string, fileId: string) {
    return this.webService.delete(`folders/${folderId}/files/${fileId}`);
  }

  // Step methods
  getSteps() {
    return this.webService.get('steps');
  }
}
