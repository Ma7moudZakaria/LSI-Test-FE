import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDayTaskRepetitionComponent } from './program-day-task-repetition.component';

describe('ProgramDayTaskRepetitionComponent', () => {
  let component: ProgramDayTaskRepetitionComponent;
  let fixture: ComponentFixture<ProgramDayTaskRepetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDayTaskRepetitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDayTaskRepetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
