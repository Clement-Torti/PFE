import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { Step } from '../models/step';

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

  getStep(stepId: string) {
    return this.webService.get(`steps/${stepId}`);
  }

  postStep(step: Step) {
    const params = [];
    for (const param of step.params) {
      params.push({
        name: param.name,
        paramType: param.type.toString(),
        value: param.value,
      });
    }

    return this.webService.post(`steps`, {
      title: step.title,
      description: step.description,
      code: step.code,
      stepType: step.stepType.toString(),
      params: params,
    });
  }

  deleteStep(stepId: string) {
    return this.webService.delete(`steps/${stepId}`);
  }

  updateStep(step: Step) {
    console.log('params', step);

    return this.webService.put(`steps/${step._id}`, {
      title: step.title,
      description: step.description,
      code: step.code,
      stepType: step.stepType,
      params: [],
    });
  }
}
