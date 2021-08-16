import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinedConditionOverlayComponent } from './predefined-condition-overlay.component';

describe('PredefinedConditionOverlayComponent', () => {
  let component: PredefinedConditionOverlayComponent;
  let fixture: ComponentFixture<PredefinedConditionOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredefinedConditionOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredefinedConditionOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
