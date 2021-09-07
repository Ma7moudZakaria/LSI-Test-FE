import { TestBed } from '@angular/core/testing';

import { AdminStudentTabService } from './admin-student-tab.service';

describe('AdminStudentTabService', () => {
  let service: AdminStudentTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminStudentTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
