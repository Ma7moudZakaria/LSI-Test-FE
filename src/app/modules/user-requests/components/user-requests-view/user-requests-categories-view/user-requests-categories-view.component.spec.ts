import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRequestsCategoriesViewComponent } from './user-requests-categories-view.component';


describe('UserRequestsCategoriesViewComponent', () => {
  let component: UserRequestsCategoriesViewComponent;
  let fixture: ComponentFixture<UserRequestsCategoriesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRequestsCategoriesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestsCategoriesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
