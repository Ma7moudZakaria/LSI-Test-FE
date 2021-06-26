import { TestBed } from '@angular/core/testing';

import { FeelingsService } from './feelings.service';

describe('FeelingsService', () => {
  let service: FeelingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeelingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
