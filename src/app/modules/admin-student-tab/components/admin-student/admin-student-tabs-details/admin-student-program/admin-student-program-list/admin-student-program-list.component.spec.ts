import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentProgramListComponent } from './admin-student-program-list.component';

describe('AdminStudentProgramListComponent', () => {
  let component: AdminStudentProgramListComponent;
  let fixture: ComponentFixture<AdminStudentProgramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentProgramListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
