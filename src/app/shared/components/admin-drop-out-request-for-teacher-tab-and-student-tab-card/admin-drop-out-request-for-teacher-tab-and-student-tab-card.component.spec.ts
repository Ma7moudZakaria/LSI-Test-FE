import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDropOutRequestForTeacherTabAndStudentTabCardComponent } from './admin-drop-out-request-for-teacher-tab-and-student-tab-card.component';

describe('AdminDropOutRequestForTeacherTabAndStudentTabCardComponent', () => {
  let component: AdminDropOutRequestForTeacherTabAndStudentTabCardComponent;
  let fixture: ComponentFixture<AdminDropOutRequestForTeacherTabAndStudentTabCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDropOutRequestForTeacherTabAndStudentTabCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDropOutRequestForTeacherTabAndStudentTabCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
