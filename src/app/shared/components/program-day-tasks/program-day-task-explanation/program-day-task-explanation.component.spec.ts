import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDayTaskExplanationComponent } from './program-day-task-explanation.component';

describe('ProgramDayTaskExplanationComponent', () => {
  let component: ProgramDayTaskExplanationComponent;
  let fixture: ComponentFixture<ProgramDayTaskExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDayTaskExplanationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDayTaskExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
