import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStudentScientificProblemComponent } from './card-student-scientific-problem.component';

describe('CardStudentScientificProblemComponent', () => {
  let component: CardStudentScientificProblemComponent;
  let fixture: ComponentFixture<CardStudentScientificProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardStudentScientificProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardStudentScientificProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
