import { TestBed } from '@angular/core/testing';

import { StudentDropOutRequestService } from './student-drop-out-request.service';

describe('StudentDropOutRequestService', () => {
  let service: StudentDropOutRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentDropOutRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
