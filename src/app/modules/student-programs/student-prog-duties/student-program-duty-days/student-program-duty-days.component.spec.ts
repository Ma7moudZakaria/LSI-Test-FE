import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramDutyDaysComponent } from './student-program-duty-days.component';

describe('StudentProgramDutyDaysComponent', () => {
  let component: StudentProgramDutyDaysComponent;
  let fixture: ComponentFixture<StudentProgramDutyDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgramDutyDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgramDutyDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
