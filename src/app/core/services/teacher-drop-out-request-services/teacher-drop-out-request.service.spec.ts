import { TestBed } from '@angular/core/testing';

import { TeacherDropOutRequestService } from './teacher-drop-out-request.service';

describe('TeacherDropOutRequestService', () => {
  let service: TeacherDropOutRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherDropOutRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
