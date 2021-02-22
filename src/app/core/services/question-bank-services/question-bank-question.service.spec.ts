import { TestBed } from '@angular/core/testing';

import { QuestionBankQuestionService } from './question-bank-question.service';

describe('QuestionBankQuestionService', () => {
  let service: QuestionBankQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionBankQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
