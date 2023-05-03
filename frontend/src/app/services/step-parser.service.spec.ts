import { TestBed } from '@angular/core/testing';

import { StepParserService } from './step-parser.service';

describe('StepParserService', () => {
  let service: StepParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
