import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserScientificProblemComponent } from './user-scientific-problem.component';


describe('UserScientificProblemComponent', () => {
  let component: UserScientificProblemComponent;
  let fixture: ComponentFixture<UserScientificProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserScientificProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserScientificProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
