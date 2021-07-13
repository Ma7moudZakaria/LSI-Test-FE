import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSubscriptionGridComponent } from './program-subscription-grid.component';

describe('ProgramSubscriptionGridComponent', () => {
  let component: ProgramSubscriptionGridComponent;
  let fixture: ComponentFixture<ProgramSubscriptionGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramSubscriptionGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramSubscriptionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
