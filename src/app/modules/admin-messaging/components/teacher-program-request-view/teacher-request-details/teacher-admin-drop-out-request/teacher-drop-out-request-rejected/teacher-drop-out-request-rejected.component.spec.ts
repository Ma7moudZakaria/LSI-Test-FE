import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDropOutRequestRejectedComponent } from './teacher-drop-out-request-rejected.component';

describe('TeacherDropOutRequestRejectedComponent', () => {
  let component: TeacherDropOutRequestRejectedComponent;
  let fixture: ComponentFixture<TeacherDropOutRequestRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDropOutRequestRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDropOutRequestRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
