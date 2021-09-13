import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeacherAvailableTimesComponent } from './admin-teacher-available-times.component';

describe('AdminTeacherAvailableTimesComponent', () => {
  let component: AdminTeacherAvailableTimesComponent;
  let fixture: ComponentFixture<AdminTeacherAvailableTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeacherAvailableTimesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeacherAvailableTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
