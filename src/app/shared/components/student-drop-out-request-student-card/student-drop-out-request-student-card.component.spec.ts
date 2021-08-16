import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDropOutRequestStudentCardComponent } from './student-drop-out-request-student-card.component';

describe('StudentDropOutRequestStudentCardComponent', () => {
  let component: StudentDropOutRequestStudentCardComponent;
  let fixture: ComponentFixture<StudentDropOutRequestStudentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDropOutRequestStudentCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDropOutRequestStudentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
