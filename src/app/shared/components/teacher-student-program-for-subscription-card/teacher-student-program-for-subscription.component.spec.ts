import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentProgramForSubscriptionComponent } from './teacher-student-program-for-subscription.component';

describe('TeacherStudentProgramForSubscriptionComponent', () => {
  let component: TeacherStudentProgramForSubscriptionComponent;
  let fixture: ComponentFixture<TeacherStudentProgramForSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherStudentProgramForSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStudentProgramForSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
