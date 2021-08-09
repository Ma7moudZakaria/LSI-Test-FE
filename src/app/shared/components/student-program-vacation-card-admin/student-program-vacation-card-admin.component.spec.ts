import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramVacationCardAdminComponent } from './student-program-vacation-card-admin.component';

describe('StudentProgramVacationCardAdminComponent', () => {
  let component: StudentProgramVacationCardAdminComponent;
  let fixture: ComponentFixture<StudentProgramVacationCardAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgramVacationCardAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgramVacationCardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
