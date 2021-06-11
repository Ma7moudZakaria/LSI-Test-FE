import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeelingsViewComponent } from './feelings-view.component';

describe('FeelingsViewComponent', () => {
  let component: FeelingsViewComponent;
  let fixture: ComponentFixture<FeelingsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeelingsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeelingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
