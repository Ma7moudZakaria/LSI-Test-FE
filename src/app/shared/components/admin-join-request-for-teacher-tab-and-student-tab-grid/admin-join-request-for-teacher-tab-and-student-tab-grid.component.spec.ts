import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJoinRequestForTeacherTabAndStudentTabGridComponent } from './admin-join-request-for-teacher-tab-and-student-tab-grid.component';

describe('AdminJoinRequestForTeacherTabAndStudentTabGridComponent', () => {
  let component: AdminJoinRequestForTeacherTabAndStudentTabGridComponent;
  let fixture: ComponentFixture<AdminJoinRequestForTeacherTabAndStudentTabGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminJoinRequestForTeacherTabAndStudentTabGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminJoinRequestForTeacherTabAndStudentTabGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
