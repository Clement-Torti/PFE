import { TestBed } from '@angular/core/testing';

import { OpenDirectoryService } from './open-directory.service';

describe('OpenDirectoryService', () => {
  let service: OpenDirectoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenDirectoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
