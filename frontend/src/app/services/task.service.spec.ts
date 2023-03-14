import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { WebService } from './web.service';

describe('TaskService', () => {
  let service: TaskService;
  let webServiceSpy: jasmine.SpyObj<WebService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('WebService', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: WebService, useValue: webServiceSpy },
      ],
    });
    service = TestBed.inject(TaskService);
    webServiceSpy = TestBed.inject(WebService) as jasmine.SpyObj<WebService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
