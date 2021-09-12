import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAppointmentAdvancedSearchComponent } from './teacher-appointment-advanced-search.component';

describe('TeacherAppointmentAdvancedSearchComponent', () => {
  let component: TeacherAppointmentAdvancedSearchComponent;
  let fixture: ComponentFixture<TeacherAppointmentAdvancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAppointmentAdvancedSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAppointmentAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
