import { TestBed } from '@angular/core/testing';

import { ProgramBasicInfoService } from './program-basic-info.service';

describe('ProgramBasicInfoService', () => {
  let service: ProgramBasicInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramBasicInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
