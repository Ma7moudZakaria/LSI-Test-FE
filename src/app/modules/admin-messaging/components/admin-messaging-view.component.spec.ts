import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessagingViewComponent } from './admin-messaging-view.component';

describe('AdminMessagingViewComponent', () => {
  let component: AdminMessagingViewComponent;
  let fixture: ComponentFixture<AdminMessagingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMessagingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMessagingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
