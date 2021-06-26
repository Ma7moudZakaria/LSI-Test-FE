import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDayTasksDetailsComponent } from './program-day-tasks-details.component';

describe('ProgramDayTasksDetailsComponent', () => {
  let component: ProgramDayTasksDetailsComponent;
  let fixture: ComponentFixture<ProgramDayTasksDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDayTasksDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDayTasksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
