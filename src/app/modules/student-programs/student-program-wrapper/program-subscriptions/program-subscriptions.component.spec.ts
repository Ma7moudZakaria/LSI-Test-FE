import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSubscriptionsComponent } from './program-subscriptions.component';

describe('ProgramSubscriptionsComponent', () => {
  let component: ProgramSubscriptionsComponent;
  let fixture: ComponentFixture<ProgramSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramSubscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
