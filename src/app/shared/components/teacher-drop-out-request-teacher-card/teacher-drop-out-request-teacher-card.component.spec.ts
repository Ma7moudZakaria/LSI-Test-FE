import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDropOutRequestTeacherCardComponent } from './teacher-drop-out-request-teacher-card.component';

describe('TeacherDropOutRequestTeacherCardComponent', () => {
  let component: TeacherDropOutRequestTeacherCardComponent;
  let fixture: ComponentFixture<TeacherDropOutRequestTeacherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDropOutRequestTeacherCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDropOutRequestTeacherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
