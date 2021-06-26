import { TestBed } from '@angular/core/testing';

import { ProgramNotificationService } from './program-notification.service';

describe('ProgramNotificationService', () => {
  let service: ProgramNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
