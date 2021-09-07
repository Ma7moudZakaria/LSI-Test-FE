import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramDutyDaysTaskDetailsComponent } from './student-program-duty-days-task-details.component';

describe('StudentProgramDutyDaysTaskDetailsComponent', () => {
  let component: StudentProgramDutyDaysTaskDetailsComponent;
  let fixture: ComponentFixture<StudentProgramDutyDaysTaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgramDutyDaysTaskDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgramDutyDaysTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
