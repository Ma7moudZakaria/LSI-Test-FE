import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDayTaskHearingComponent } from './program-day-task-hearing.component';

describe('ProgramDayTaskHearingComponent', () => {
  let component: ProgramDayTaskHearingComponent;
  let fixture: ComponentFixture<ProgramDayTaskHearingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDayTaskHearingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDayTaskHearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
