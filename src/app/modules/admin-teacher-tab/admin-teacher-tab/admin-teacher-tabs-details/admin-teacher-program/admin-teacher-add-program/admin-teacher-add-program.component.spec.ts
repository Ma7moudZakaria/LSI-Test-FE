import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeacherAddProgramComponent } from './admin-teacher-add-program.component';

describe('AdminTeacherAddProgramComponent', () => {
  let component: AdminTeacherAddProgramComponent;
  let fixture: ComponentFixture<AdminTeacherAddProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeacherAddProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeacherAddProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
