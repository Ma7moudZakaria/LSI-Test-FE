import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeacherDropOutComponent } from './admin-teacher-drop-out.component';

describe('AdminTeacherDropOutComponent', () => {
  let component: AdminTeacherDropOutComponent;
  let fixture: ComponentFixture<AdminTeacherDropOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeacherDropOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeacherDropOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
