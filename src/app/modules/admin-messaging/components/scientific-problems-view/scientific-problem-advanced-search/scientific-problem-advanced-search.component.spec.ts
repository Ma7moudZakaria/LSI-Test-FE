import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificProblemAdvancedSearchComponent } from './scientific-problem-advanced-search.component';

describe('ScientificProblemAdvancedSearchComponent', () => {
  let component: ScientificProblemAdvancedSearchComponent;
  let fixture: ComponentFixture<ScientificProblemAdvancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScientificProblemAdvancedSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientificProblemAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
