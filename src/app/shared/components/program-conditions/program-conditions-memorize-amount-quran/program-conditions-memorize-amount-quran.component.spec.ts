import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramConditionsMemorizeAmountQuranComponent } from './program-conditions-memorize-amount-quran.component';

describe('ProgramConditionsMemorizeAmountQuranComponent', () => {
  let component: ProgramConditionsMemorizeAmountQuranComponent;
  let fixture: ComponentFixture<ProgramConditionsMemorizeAmountQuranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramConditionsMemorizeAmountQuranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramConditionsMemorizeAmountQuranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
