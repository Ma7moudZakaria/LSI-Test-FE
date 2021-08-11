import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomConditionOverlayComponent } from './custom-condition-overlay.component';

describe('CustomConditionOverlayComponent', () => {
  let component: CustomConditionOverlayComponent;
  let fixture: ComponentFixture<CustomConditionOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomConditionOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomConditionOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
