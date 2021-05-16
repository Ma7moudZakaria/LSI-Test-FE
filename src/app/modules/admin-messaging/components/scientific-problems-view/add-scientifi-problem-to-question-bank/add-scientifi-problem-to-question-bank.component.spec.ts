import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScientifiProblemToQuestionBankComponent } from './add-scientifi-problem-to-question-bank.component';

describe('AddScientifiProblemToQuestionBankComponent', () => {
  let component: AddScientifiProblemToQuestionBankComponent;
  let fixture: ComponentFixture<AddScientifiProblemToQuestionBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScientifiProblemToQuestionBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScientifiProblemToQuestionBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
