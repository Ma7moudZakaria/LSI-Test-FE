import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDayTasksComponent } from './program-day-tasks.component';

describe('ProgramDayTasksComponent', () => {
  let component: ProgramDayTasksComponent;
  let fixture: ComponentFixture<ProgramDayTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDayTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDayTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
