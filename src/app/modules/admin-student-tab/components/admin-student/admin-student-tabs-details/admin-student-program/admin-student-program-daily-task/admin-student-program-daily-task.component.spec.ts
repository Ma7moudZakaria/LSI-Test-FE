import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentProgramDailyTaskComponent } from './admin-student-program-daily-task.component';

describe('AdminStudentProgramDailyTaskComponent', () => {
  let component: AdminStudentProgramDailyTaskComponent;
  let fixture: ComponentFixture<AdminStudentProgramDailyTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentProgramDailyTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentProgramDailyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
