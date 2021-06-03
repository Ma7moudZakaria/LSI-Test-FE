import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDayTaskLinkingComponent } from './program-day-task-linking.component';

describe('ProgramDayTaskLinkingComponent', () => {
  let component: ProgramDayTaskLinkingComponent;
  let fixture: ComponentFixture<ProgramDayTaskLinkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDayTaskLinkingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDayTaskLinkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
