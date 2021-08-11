import { TestBed } from '@angular/core/testing';

import { ProgramBatchesService } from './program-batches.service';

describe('ProgramBatchesServiceService', () => {
  let service: ProgramBatchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramBatchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
