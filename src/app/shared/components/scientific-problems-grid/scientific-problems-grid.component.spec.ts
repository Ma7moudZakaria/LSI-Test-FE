import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificProblemsGridComponent } from './scientific-problems-grid.component';

describe('ScientificProblemsGridComponent', () => {
  let component: ScientificProblemsGridComponent;
  let fixture: ComponentFixture<ScientificProblemsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScientificProblemsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientificProblemsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
