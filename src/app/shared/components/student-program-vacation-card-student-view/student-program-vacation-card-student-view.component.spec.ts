import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramVacationCardStudentViewComponent } from './student-program-vacation-card-student-view.component';

describe('StudentProgramVacationCardStudentViewComponent', () => {
  let component: StudentProgramVacationCardStudentViewComponent;
  let fixture: ComponentFixture<StudentProgramVacationCardStudentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgramVacationCardStudentViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgramVacationCardStudentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
