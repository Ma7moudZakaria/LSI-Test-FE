import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDayTaskTestPhasedComponent } from './program-day-task-test-phased.component';

describe('ProgramDayTaskTestPhasedComponent', () => {
  let component: ProgramDayTaskTestPhasedComponent;
  let fixture: ComponentFixture<ProgramDayTaskTestPhasedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDayTaskTestPhasedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDayTaskTestPhasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
