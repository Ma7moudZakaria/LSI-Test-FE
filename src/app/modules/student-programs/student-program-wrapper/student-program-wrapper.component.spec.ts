import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramWrapperComponent } from './student-program-wrapper.component';

describe('StudentProgramWrapperComponent', () => {
  let component: StudentProgramWrapperComponent;
  let fixture: ComponentFixture<StudentProgramWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgramWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgramWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
