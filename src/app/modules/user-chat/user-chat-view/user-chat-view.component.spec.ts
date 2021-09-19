import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChatViewComponent } from './user-chat-view.component';

describe('UserChatViewComponent', () => {
  let component: UserChatViewComponent;
  let fixture: ComponentFixture<UserChatViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChatViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
