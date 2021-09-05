import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAppointmentRejectComponent } from './teacher-appointment-reject.component';

describe('TeacherAppointmentRejectComponent', () => {
  let component: TeacherAppointmentRejectComponent;
  let fixture: ComponentFixture<TeacherAppointmentRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAppointmentRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAppointmentRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
