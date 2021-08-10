import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDropOutRequestComponent } from './teacher-drop-out-request.component';

describe('TeacherDropOutRequestComponent', () => {
  let component: TeacherDropOutRequestComponent;
  let fixture: ComponentFixture<TeacherDropOutRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDropOutRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDropOutRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
