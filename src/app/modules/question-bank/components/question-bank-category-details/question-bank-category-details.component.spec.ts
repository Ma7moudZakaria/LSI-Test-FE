import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBankCategoryDetailsComponent } from './question-bank-category-details.component';

describe('QuestionBankCategoryDetailsComponent', () => {
  let component: QuestionBankCategoryDetailsComponent;
  let fixture: ComponentFixture<QuestionBankCategoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionBankCategoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionBankCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
