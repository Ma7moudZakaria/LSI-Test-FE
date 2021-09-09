import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDropOutRequestForTeacherTabAndStudentTabGridComponent } from './admin-drop-out-request-for-teacher-tab-and-student-tab-grid.component';

describe('AdminDropOutRequestForTeacherTabAndStudentTabGridComponent', () => {
  let component: AdminDropOutRequestForTeacherTabAndStudentTabGridComponent;
  let fixture: ComponentFixture<AdminDropOutRequestForTeacherTabAndStudentTabGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDropOutRequestForTeacherTabAndStudentTabGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDropOutRequestForTeacherTabAndStudentTabGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
