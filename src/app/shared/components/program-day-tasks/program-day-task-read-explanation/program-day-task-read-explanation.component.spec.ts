import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDayTaskReadExplanationComponent } from './program-day-task-read-explanation.component';

describe('ProgramDayTaskReadExplanationComponent', () => {
  let component: ProgramDayTaskReadExplanationComponent;
  let fixture: ComponentFixture<ProgramDayTaskReadExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDayTaskReadExplanationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDayTaskReadExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
