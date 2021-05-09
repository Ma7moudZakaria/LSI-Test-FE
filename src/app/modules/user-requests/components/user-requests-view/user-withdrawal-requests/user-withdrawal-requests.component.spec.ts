import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserWithdrawalRequestsComponent } from './user-withdrawal-requests.component';


describe('UserWithdrawalRequestsComponent', () => {
  let component: UserWithdrawalRequestsComponent;
  let fixture: ComponentFixture<UserWithdrawalRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWithdrawalRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWithdrawalRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
