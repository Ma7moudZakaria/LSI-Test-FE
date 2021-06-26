import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDayTaskEncouragementLetterComponent } from './program-day-task-encouragement-letter.component';

describe('ProgramDayTaskEncouragementLetterComponent', () => {
  let component: ProgramDayTaskEncouragementLetterComponent;
  let fixture: ComponentFixture<ProgramDayTaskEncouragementLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDayTaskEncouragementLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDayTaskEncouragementLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
