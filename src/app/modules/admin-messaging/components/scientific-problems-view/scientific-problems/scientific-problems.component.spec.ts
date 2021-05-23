import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificProblemsComponent } from './scientific-problems.component';

describe('ScientificProblemsComponent', () => {
  let component: ScientificProblemsComponent;
  let fixture: ComponentFixture<ScientificProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScientificProblemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientificProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
