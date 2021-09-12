import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAppointmentRequestDatailsComponent } from './teacher-appointment-request-datails.component';

describe('TeacherAppointmentRequestDatailsComponent', () => {
  let component: TeacherAppointmentRequestDatailsComponent;
  let fixture: ComponentFixture<TeacherAppointmentRequestDatailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAppointmentRequestDatailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAppointmentRequestDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
