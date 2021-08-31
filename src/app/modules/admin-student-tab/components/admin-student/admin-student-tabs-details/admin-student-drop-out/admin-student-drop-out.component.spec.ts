import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentDropOutComponent } from './admin-student-drop-out.component';

describe('AdminStudentDropOutComponent', () => {
  let component: AdminStudentDropOutComponent;
  let fixture: ComponentFixture<AdminStudentDropOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentDropOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentDropOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
