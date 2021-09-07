import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeacherProgramDetailsComponent } from './admin-teacher-program-details.component';

describe('AdminTeacherProgramDetailsComponent', () => {
  let component: AdminTeacherProgramDetailsComponent;
  let fixture: ComponentFixture<AdminTeacherProgramDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeacherProgramDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeacherProgramDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
