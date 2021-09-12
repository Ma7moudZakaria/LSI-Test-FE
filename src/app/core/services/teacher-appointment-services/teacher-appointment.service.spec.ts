import { TestBed } from '@angular/core/testing';

import { TeacherAppointmentService } from './teacher-appointment.service';

describe('TeacherAppointmentService', () => {
  let service: TeacherAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
