import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WalkThroughComponent } from './walk-through';

describe('WalkThroughComponent', () => {
  let component: WalkThroughComponent;
  let fixture: ComponentFixture<WalkThroughComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkThroughComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkThroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
