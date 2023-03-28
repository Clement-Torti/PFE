import { TestBed } from '@angular/core/testing';

import { TestParserService } from './test-parser.service';

describe('TestParserService', () => {
  let service: TestParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
