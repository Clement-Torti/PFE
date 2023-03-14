import { TestBed } from '@angular/core/testing';
import { FolderService } from './folder.service';
import { WebService } from './web.service';

describe('FolderService', () => {
  let service: FolderService;
  let webServiceSpy: jasmine.SpyObj<WebService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('WebService', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    TestBed.configureTestingModule({
      providers: [{ provide: WebService, useValue: webServiceSpy }],
    });
    service = TestBed.inject(FolderService);
    webServiceSpy = TestBed.inject(WebService) as jasmine.SpyObj<WebService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
