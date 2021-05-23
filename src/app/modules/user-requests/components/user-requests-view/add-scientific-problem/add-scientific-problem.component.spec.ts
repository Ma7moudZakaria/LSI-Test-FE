import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScientificProblemComponent } from './add-scientific-problem.component';

describe('AddScientificProblemComponent', () => {
  let component: AddScientificProblemComponent;
  let fixture: ComponentFixture<AddScientificProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScientificProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScientificProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
