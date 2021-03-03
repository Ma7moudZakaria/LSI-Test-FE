import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAllContentManagementComponent } from './view-all-content-management';


describe('ViewAllContentManagementComponent', () => {
  let component: ViewAllContentManagementComponent;
  let fixture: ComponentFixture<ViewAllContentManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllContentManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllContentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
