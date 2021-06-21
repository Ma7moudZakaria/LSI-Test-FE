import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramConditionsMemorizeQuranComponent } from './program-conditions-memorize-quran.component';

describe('ProgramConditionsMemorizeQuranComponent', () => {
  let component: ProgramConditionsMemorizeQuranComponent;
  let fixture: ComponentFixture<ProgramConditionsMemorizeQuranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramConditionsMemorizeQuranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramConditionsMemorizeQuranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
