import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttacheExamTemplateComponent } from './attache-exam-template.component';

describe('AttacheExamTemplateComponent', () => {
  let component: AttacheExamTemplateComponent;
  let fixture: ComponentFixture<AttacheExamTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttacheExamTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttacheExamTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
