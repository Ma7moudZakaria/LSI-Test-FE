import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeacherJoinRequestComponent } from './admin-teacher-join-request.component';

describe('AdminTeacherJoinRequestComponent', () => {
  let component: AdminTeacherJoinRequestComponent;
  let fixture: ComponentFixture<AdminTeacherJoinRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeacherJoinRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeacherJoinRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
