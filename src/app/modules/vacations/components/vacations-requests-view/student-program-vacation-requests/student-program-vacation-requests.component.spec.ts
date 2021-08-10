import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramVacationRequestsComponent } from './student-program-vacation-requests.component';

describe('StudentProgramVacationRequestsComponent', () => {
  let component: StudentProgramVacationRequestsComponent;
  let fixture: ComponentFixture<StudentProgramVacationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgramVacationRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgramVacationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
