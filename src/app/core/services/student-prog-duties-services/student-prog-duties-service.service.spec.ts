import { TestBed } from '@angular/core/testing';

import { StudentProgDutiesServiceService } from './student-prog-duties-service.service';

describe('StudentProgDutiesServiceService', () => {
  let service: StudentProgDutiesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentProgDutiesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
