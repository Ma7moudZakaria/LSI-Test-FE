import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentVacationRequestComponent } from './admin-student-vacation-request.component';

describe('AdminStudentVacationRequestComponent', () => {
  let component: AdminStudentVacationRequestComponent;
  let fixture: ComponentFixture<AdminStudentVacationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentVacationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentVacationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
