import { TestBed } from '@angular/core/testing';

import { StudentProgramSubscriptionServicesService } from './student-program-subscription-services.service';

describe('StudentProgramSubscriptionServicesService', () => {
  let service: StudentProgramSubscriptionServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentProgramSubscriptionServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
