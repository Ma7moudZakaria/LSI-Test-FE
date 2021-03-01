import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBankQuestionsViewComponent } from './question-bank-questions-view.component';

describe('QuestionBankQuestionsViewComponent', () => {
  let component: QuestionBankQuestionsViewComponent;
  let fixture: ComponentFixture<QuestionBankQuestionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionBankQuestionsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionBankQuestionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
