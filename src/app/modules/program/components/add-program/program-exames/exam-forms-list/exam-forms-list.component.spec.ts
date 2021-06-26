import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamFormsListComponent } from './exam-forms-list.component';

describe('ExamFormsListComponent', () => {
  let component: ExamFormsListComponent;
  let fixture: ComponentFixture<ExamFormsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamFormsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamFormsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
