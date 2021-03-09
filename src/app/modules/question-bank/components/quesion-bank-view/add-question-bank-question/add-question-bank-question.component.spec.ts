import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionBankQuestionComponent } from './add-question-bank-question.component';

describe('AddQuestionBankQuestionComponent', () => {
  let component: AddQuestionBankQuestionComponent;
  let fixture: ComponentFixture<AddQuestionBankQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestionBankQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionBankQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
