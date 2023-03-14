import { TestBed } from '@angular/core/testing';
import { WebService } from './web.service';
import { HttpClient } from '@angular/common/http';

describe('WebService', () => {
  let service: WebService;
  let webServiceSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('WebService', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    TestBed.configureTestingModule({
      providers: [WebService, { provide: HttpClient, useValue: webServiceSpy }],
    });
    service = TestBed.inject(WebService);
    webServiceSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
