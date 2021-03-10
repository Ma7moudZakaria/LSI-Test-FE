import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserProfileCustomComponent } from './view-user-profile-custom.component';

describe('ViewUserProfileCustomComponent', () => {
  let component: ViewUserProfileCustomComponent;
  let fixture: ComponentFixture<ViewUserProfileCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserProfileCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserProfileCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
