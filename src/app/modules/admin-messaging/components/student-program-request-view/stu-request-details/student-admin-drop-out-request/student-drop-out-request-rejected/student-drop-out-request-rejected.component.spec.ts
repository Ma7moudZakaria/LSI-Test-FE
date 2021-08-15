import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDropOutRequestRejectedComponent } from './student-drop-out-request-rejected.component';

describe('StudentDropOutRequestRejectedComponent', () => {
  let component: StudentDropOutRequestRejectedComponent;
  let fixture: ComponentFixture<StudentDropOutRequestRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDropOutRequestRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDropOutRequestRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
