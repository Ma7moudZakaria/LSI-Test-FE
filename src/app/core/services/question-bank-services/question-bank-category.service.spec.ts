import { TestBed } from '@angular/core/testing';

import { QuestionBankCategoryService } from './question-bank-category.service';

describe('QuestionBankCategoryService', () => {
  let service: QuestionBankCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionBankCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
