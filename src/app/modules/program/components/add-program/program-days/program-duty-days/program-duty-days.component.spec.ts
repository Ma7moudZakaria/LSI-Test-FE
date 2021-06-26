import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDutyDaysComponent } from './program-duty-days.component';

describe('ProgramDutyDaysComponent', () => {
  let component: ProgramDutyDaysComponent;
  let fixture: ComponentFixture<ProgramDutyDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDutyDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDutyDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
