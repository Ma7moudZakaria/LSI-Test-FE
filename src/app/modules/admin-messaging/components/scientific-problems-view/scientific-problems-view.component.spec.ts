import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificProblemsViewComponent } from './scientific-problems-view.component';

describe('ScientificProblemsViewComponent', () => {
  let component: ScientificProblemsViewComponent;
  let fixture: ComponentFixture<ScientificProblemsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScientificProblemsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientificProblemsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
