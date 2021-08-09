import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramSubDetailsComponent } from './student-program-sub-details.component';

describe('StudentProgramSubDetailsComponent', () => {
  let component: StudentProgramSubDetailsComponent;
  let fixture: ComponentFixture<StudentProgramSubDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgramSubDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgramSubDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
