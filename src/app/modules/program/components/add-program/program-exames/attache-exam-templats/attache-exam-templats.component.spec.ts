import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttacheExamTemplatsComponent } from './attache-exam-templats.component';

describe('AttacheExamTemplatsComponent', () => {
  let component: AttacheExamTemplatsComponent;
  let fixture: ComponentFixture<AttacheExamTemplatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttacheExamTemplatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttacheExamTemplatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
