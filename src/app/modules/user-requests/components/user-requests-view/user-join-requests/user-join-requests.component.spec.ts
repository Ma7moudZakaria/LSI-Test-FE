import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserJoinRequestsComponent } from './user-join-requests.component';


describe('UserJoinRequestsComponent', () => {
  let component: UserJoinRequestsComponent;
  let fixture: ComponentFixture<UserJoinRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserJoinRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserJoinRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
