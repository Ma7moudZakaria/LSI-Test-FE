import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramVacationGridComponent } from './student-program-vacation-grid.component';

describe('StudentProgramVacationGridComponent', () => {
  let component: StudentProgramVacationGridComponent;
  let fixture: ComponentFixture<StudentProgramVacationGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgramVacationGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgramVacationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
