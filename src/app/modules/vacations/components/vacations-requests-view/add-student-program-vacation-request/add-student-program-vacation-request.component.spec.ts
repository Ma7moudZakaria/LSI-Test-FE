import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentProgramVacationRequestComponent } from './add-student-program-vacation-request.component';

describe('AddStudentProgramVacationRequestComponent', () => {
  let component: AddStudentProgramVacationRequestComponent;
  let fixture: ComponentFixture<AddStudentProgramVacationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentProgramVacationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentProgramVacationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
