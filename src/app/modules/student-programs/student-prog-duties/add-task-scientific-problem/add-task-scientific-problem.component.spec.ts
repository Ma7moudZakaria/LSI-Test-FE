import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskScientificProblemComponent } from './add-task-scientific-problem.component';

describe('AddTaskScientificProblemComponent', () => {
  let component: AddTaskScientificProblemComponent;
  let fixture: ComponentFixture<AddTaskScientificProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskScientificProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskScientificProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
