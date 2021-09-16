import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExamAnswersComponent } from './view-exam-answers.component';

describe('ViewExamAnswersComponent', () => {
  let component: ViewExamAnswersComponent;
  let fixture: ComponentFixture<ViewExamAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewExamAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExamAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
