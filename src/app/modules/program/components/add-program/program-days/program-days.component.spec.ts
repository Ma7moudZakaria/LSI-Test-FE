import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDaysComponent } from './program-days.component';

describe('ProgramDaysComponent', () => {
  let component: ProgramDaysComponent;
  let fixture: ComponentFixture<ProgramDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
