import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQuitRequestComponent } from './teacher-quit-request.component';

describe('TeacherQuitRequestComponent', () => {
  let component: TeacherQuitRequestComponent;
  let fixture: ComponentFixture<TeacherQuitRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherQuitRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherQuitRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
