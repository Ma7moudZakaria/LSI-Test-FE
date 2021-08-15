import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDailyUpcomingTasksComponent } from './teacher-daily-upcoming-tasks.component';

describe('TeacherDailyUpcomingTasksComponent', () => {
  let component: TeacherDailyUpcomingTasksComponent;
  let fixture: ComponentFixture<TeacherDailyUpcomingTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDailyUpcomingTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDailyUpcomingTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
