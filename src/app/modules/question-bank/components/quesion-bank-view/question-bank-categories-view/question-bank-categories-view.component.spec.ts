import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBankCategoriesViewComponent } from './question-bank-categories-view.component';

describe('QuestionBankCategoriesViewComponent', () => {
  let component: QuestionBankCategoriesViewComponent;
  let fixture: ComponentFixture<QuestionBankCategoriesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionBankCategoriesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionBankCategoriesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
