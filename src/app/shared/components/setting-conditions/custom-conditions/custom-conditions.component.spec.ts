import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomConditionsComponent } from './custom-conditions.component';

describe('CustomConditionsComponent', () => {
  let component: CustomConditionsComponent;
  let fixture: ComponentFixture<CustomConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
