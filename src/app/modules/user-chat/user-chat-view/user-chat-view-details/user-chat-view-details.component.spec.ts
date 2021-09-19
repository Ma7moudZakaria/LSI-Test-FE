import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChatViewDetailsComponent } from './user-chat-view-details.component';

describe('UserChatViewDetailsComponent', () => {
  let component: UserChatViewDetailsComponent;
  let fixture: ComponentFixture<UserChatViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChatViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChatViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
