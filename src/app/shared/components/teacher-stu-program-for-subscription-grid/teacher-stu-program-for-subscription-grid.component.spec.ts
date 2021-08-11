import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStuProgramForSubscriptionGridComponent } from './teacher-stu-program-for-subscription-grid.component';

describe('TeacherStuProgramForSubscriptionGridComponent', () => {
  let component: TeacherStuProgramForSubscriptionGridComponent;
  let fixture: ComponentFixture<TeacherStuProgramForSubscriptionGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherStuProgramForSubscriptionGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStuProgramForSubscriptionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
