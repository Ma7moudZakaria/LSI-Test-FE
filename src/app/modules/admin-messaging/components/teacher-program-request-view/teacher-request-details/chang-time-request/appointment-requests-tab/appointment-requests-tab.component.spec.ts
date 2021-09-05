import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentRequestsTabComponent } from './appointment-requests-tab.component';

describe('AppointmentRequestsTabComponent', () => {
  let component: AppointmentRequestsTabComponent;
  let fixture: ComponentFixture<AppointmentRequestsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentRequestsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentRequestsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
