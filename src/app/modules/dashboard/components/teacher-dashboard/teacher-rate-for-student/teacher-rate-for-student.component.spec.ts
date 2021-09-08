import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRateForStudentComponent } from './teacher-rate-for-student.component';

describe('TeacherRateForStudentComponent', () => {
  let component: TeacherRateForStudentComponent;
  let fixture: ComponentFixture<TeacherRateForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherRateForStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRateForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
