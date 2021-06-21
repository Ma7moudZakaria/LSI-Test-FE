import { TestBed } from '@angular/core/testing';

import { ProgramConditionsService } from './program-conditions.service';

describe('ProgramConditionsService', () => {
  let service: ProgramConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramConditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
