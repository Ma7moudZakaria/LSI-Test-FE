import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramAttacheExamTemplatsComponent } from './program-attache-exam-templats.component';

describe('ProgramAttacheExamTemplatsComponent', () => {
  let component: ProgramAttacheExamTemplatsComponent;
  let fixture: ComponentFixture<ProgramAttacheExamTemplatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramAttacheExamTemplatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramAttacheExamTemplatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
