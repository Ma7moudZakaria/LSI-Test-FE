import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDayTaskDailyTestComponent } from './program-day-task-daily-test.component';

describe('ProgramDayTaskDailyTestComponent', () => {
  let component: ProgramDayTaskDailyTestComponent;
  let fixture: ComponentFixture<ProgramDayTaskDailyTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDayTaskDailyTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDayTaskDailyTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
