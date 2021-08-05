import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQuitTabRequestComponent } from './teacher-quit-tab-request.component';

describe('TeacherQuitTabRequestComponent', () => {
  let component: TeacherQuitTabRequestComponent;
  let fixture: ComponentFixture<TeacherQuitTabRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherQuitTabRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherQuitTabRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
