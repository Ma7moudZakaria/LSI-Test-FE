import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewUserProfileDetailsComponent } from './view-user-profile-details';

describe('ViewUserProfileDetailsComponent', () => {
  let component: ViewUserProfileDetailsComponent;
  let fixture: ComponentFixture<ViewUserProfileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserProfileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
