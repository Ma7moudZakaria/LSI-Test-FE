import { TestBed } from '@angular/core/testing';

import { AvailableTeachersService } from './available-teachers.service';

describe('AvailableTeachersService', () => {
  let service: AvailableTeachersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableTeachersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
