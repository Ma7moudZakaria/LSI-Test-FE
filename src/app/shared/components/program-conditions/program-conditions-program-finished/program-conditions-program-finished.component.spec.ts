import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramConditionsProgramFinishedComponent } from './program-conditions-program-finished.component';

describe('ProgramConditionsProgramFinishedComponent', () => {
  let component: ProgramConditionsProgramFinishedComponent;
  let fixture: ComponentFixture<ProgramConditionsProgramFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramConditionsProgramFinishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramConditionsProgramFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
