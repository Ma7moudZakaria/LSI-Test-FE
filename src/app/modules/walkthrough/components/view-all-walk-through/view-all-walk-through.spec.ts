import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAllWalkThroughComponent } from './view-all-walk-through';


describe('ViewAllWalkThroughComponent', () => {
  let component: ViewAllWalkThroughComponent;
  let fixture: ComponentFixture<ViewAllWalkThroughComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllWalkThroughComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllWalkThroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
