import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAppointmentRequestCardComponent } from './teacher-appointment-request-card.component';

describe('TeacherAppointmentRequestCardComponent', () => {
  let component: TeacherAppointmentRequestCardComponent;
  let fixture: ComponentFixture<TeacherAppointmentRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAppointmentRequestCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAppointmentRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
