import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJoinRequestForTeacherTabAndStudentTabCardComponent } from './admin-join-request-for-teacher-tab-and-student-tab-card.component';

describe('AdminJoinRequestForTeacherTabAndStudentTabCardComponent', () => {
  let component: AdminJoinRequestForTeacherTabAndStudentTabCardComponent;
  let fixture: ComponentFixture<AdminJoinRequestForTeacherTabAndStudentTabCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminJoinRequestForTeacherTabAndStudentTabCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminJoinRequestForTeacherTabAndStudentTabCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
