import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramVacationRejectComponent } from './student-program-vacation-reject.component';

describe('StudentProgramVacationRejectComponent', () => {
  let component: StudentProgramVacationRejectComponent;
  let fixture: ComponentFixture<StudentProgramVacationRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgramVacationRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgramVacationRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
