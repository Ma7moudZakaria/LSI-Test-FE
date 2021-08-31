import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeacherProgramListComponent } from './admin-teacher-program-list.component';

describe('AdminTeacherProgramListComponent', () => {
  let component: AdminTeacherProgramListComponent;
  let fixture: ComponentFixture<AdminTeacherProgramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeacherProgramListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeacherProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
