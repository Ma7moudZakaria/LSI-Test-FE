import { TestBed } from '@angular/core/testing';

import { TeacherProgramSubscriptionServicesService } from './teacher-program-subscription-services.service';

describe('TeacherProgramSubscriptionServicesService', () => {
  let service: TeacherProgramSubscriptionServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherProgramSubscriptionServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
