import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramNotificationViewComponent } from './program-notification-view.component';

describe('ProgramNotificationViewComponent', () => {
  let component: ProgramNotificationViewComponent;
  let fixture: ComponentFixture<ProgramNotificationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramNotificationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramNotificationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
