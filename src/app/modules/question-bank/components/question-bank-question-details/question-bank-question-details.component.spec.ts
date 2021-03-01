import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBankQuestionDetailsComponent } from './question-bank-question-details.component';

describe('QuestionBankQuestionDetailsComponent', () => {
  let component: QuestionBankQuestionDetailsComponent;
  let fixture: ComponentFixture<QuestionBankQuestionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionBankQuestionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionBankQuestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
