import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDayTaskRecitationComponent } from './program-day-task-recitation.component';

describe('ProgramDayTaskRecitationComponent', () => {
  let component: ProgramDayTaskRecitationComponent;
  let fixture: ComponentFixture<ProgramDayTaskRecitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDayTaskRecitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDayTaskRecitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
