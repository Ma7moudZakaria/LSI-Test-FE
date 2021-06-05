import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDayTaskMemorizeComponent } from './program-day-task-memorize.component';

describe('ProgramDayTaskMemorizeComponent', () => {
  let component: ProgramDayTaskMemorizeComponent;
  let fixture: ComponentFixture<ProgramDayTaskMemorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDayTaskMemorizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDayTaskMemorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
