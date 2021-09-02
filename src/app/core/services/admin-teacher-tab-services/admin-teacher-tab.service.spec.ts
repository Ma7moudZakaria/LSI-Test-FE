import { TestBed } from '@angular/core/testing';

import { AdminTeacherTabService } from './admin-teacher-tab.service';

describe('AdminTeacherTabService', () => {
  let service: AdminTeacherTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTeacherTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
