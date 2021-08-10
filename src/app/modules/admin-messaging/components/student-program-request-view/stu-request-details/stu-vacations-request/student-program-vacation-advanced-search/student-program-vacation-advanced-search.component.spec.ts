import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramVacationAdvancedSearchComponent } from './student-program-vacation-advanced-search.component';

describe('StudentProgramVacationAdvancedSearchComponent', () => {
  let component: StudentProgramVacationAdvancedSearchComponent;
  let fixture: ComponentFixture<StudentProgramVacationAdvancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgramVacationAdvancedSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgramVacationAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
