import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentProgramComponent } from './admin-student-program.component';

describe('AdminStudentProgramComponent', () => {
  let component: AdminStudentProgramComponent;
  let fixture: ComponentFixture<AdminStudentProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
