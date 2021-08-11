import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAvailableAppointmentsComponent } from './teacher-available-appointments.component';

describe('TeacherAvailableAppointmentsComponent', () => {
  let component: TeacherAvailableAppointmentsComponent;
  let fixture: ComponentFixture<TeacherAvailableAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAvailableAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAvailableAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
