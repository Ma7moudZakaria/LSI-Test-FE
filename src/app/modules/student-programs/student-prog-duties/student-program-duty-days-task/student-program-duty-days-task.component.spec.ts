import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramDutyDaysTaskComponent } from './student-program-duty-days-task.component';

describe('StudentProgramDutyDaysTaskComponent', () => {
  let component: StudentProgramDutyDaysTaskComponent;
  let fixture: ComponentFixture<StudentProgramDutyDaysTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgramDutyDaysTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgramDutyDaysTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
