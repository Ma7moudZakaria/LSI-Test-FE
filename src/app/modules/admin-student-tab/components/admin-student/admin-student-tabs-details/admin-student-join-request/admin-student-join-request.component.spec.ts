import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentJoinRequestComponent } from './admin-student-join-request.component';

describe('AdminStudentJoinRequestComponent', () => {
  let component: AdminStudentJoinRequestComponent;
  let fixture: ComponentFixture<AdminStudentJoinRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentJoinRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentJoinRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
