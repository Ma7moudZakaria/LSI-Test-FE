import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeacherAppointmentRequestComponent } from './add-teacher-appointment-request.component';

describe('AddTeacherAppointmentRequestComponent', () => {
  let component: AddTeacherAppointmentRequestComponent;
  let fixture: ComponentFixture<AddTeacherAppointmentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeacherAppointmentRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeacherAppointmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
