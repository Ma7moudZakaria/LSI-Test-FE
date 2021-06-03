import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDayTaskReviewComponent } from './program-day-task-review.component';

describe('ProgramDayTaskReviewComponent', () => {
  let component: ProgramDayTaskReviewComponent;
  let fixture: ComponentFixture<ProgramDayTaskReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDayTaskReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDayTaskReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
