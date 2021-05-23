import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRequestsViewComponent } from './user-requests-view.component';

describe('UserRequestsViewComponent', () => {
  let component: UserRequestsViewComponent;
  let fixture: ComponentFixture<UserRequestsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRequestsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
