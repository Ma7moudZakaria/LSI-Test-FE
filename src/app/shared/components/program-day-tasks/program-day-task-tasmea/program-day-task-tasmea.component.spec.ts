import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDayTaskTasmeaComponent } from './program-day-task-tasmea.component';

describe('ProgramDayTaskTasmeaComponent', () => {
  let component: ProgramDayTaskTasmeaComponent;
  let fixture: ComponentFixture<ProgramDayTaskTasmeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDayTaskTasmeaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDayTaskTasmeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
