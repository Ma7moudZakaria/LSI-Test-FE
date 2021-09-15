import { TestBed } from '@angular/core/testing';

import { AvailableStudentService } from './available-student.service';

describe('AvailableStudentService', () => {
  let service: AvailableStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
