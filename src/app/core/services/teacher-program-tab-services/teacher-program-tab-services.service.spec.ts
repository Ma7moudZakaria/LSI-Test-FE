import { TestBed } from '@angular/core/testing';

import { TeacherProgramTabServicesService } from './teacher-program-tab-services.service';

describe('TeacherProgramTabServicesService', () => {
  let service: TeacherProgramTabServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherProgramTabServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
