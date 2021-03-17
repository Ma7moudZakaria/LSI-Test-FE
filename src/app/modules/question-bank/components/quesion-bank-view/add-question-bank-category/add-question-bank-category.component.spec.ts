import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionBankCategoryComponent } from './add-question-bank-category.component';

describe('AddQuestionBankCategoryComponent', () => {
  let component: AddQuestionBankCategoryComponent;
  let fixture: ComponentFixture<AddQuestionBankCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestionBankCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionBankCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
