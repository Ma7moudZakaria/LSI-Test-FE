import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeacherProgramComponent } from './admin-teacher-program.component';

describe('AdminTeacherProgramComponent', () => {
  let component: AdminTeacherProgramComponent;
  let fixture: ComponentFixture<AdminTeacherProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeacherProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeacherProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
