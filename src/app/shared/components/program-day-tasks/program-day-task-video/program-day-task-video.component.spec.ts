import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDayTaskVideoComponent } from './program-day-task-video.component';

describe('ProgramDayTaskVideoComponent', () => {
  let component: ProgramDayTaskVideoComponent;
  let fixture: ComponentFixture<ProgramDayTaskVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDayTaskVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDayTaskVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
