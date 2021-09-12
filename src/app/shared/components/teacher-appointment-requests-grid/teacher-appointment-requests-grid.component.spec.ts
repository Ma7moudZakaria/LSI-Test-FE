import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAppointmentRequestsGridComponent } from './teacher-appointment-requests-grid.component';

describe('TeacherAppointmentRequestsGridComponent', () => {
  let component: TeacherAppointmentRequestsGridComponent;
  let fixture: ComponentFixture<TeacherAppointmentRequestsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAppointmentRequestsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAppointmentRequestsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
