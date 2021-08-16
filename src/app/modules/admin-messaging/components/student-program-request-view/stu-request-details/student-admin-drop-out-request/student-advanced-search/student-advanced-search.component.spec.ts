import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdvancedSearchComponent } from './student-advanced-search.component';

describe('StudentAdvancedSearchComponent', () => {
  let component: StudentAdvancedSearchComponent;
  let fixture: ComponentFixture<StudentAdvancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAdvancedSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
