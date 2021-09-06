import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinExamComponent } from './join-exam.component';

describe('JoinExamComponent', () => {
  let component: JoinExamComponent;
  let fixture: ComponentFixture<JoinExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
