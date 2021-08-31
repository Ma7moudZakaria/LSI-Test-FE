import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentProgramTaskComponent } from './admin-student-program-task.component';

describe('AdminStudentProgramTaskComponent', () => {
  let component: AdminStudentProgramTaskComponent;
  let fixture: ComponentFixture<AdminStudentProgramTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentProgramTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentProgramTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
