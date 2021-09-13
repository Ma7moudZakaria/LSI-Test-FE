import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProgramWrapperComponent } from './teacher-program-wrapper.component';

describe('TeacherProgramWrapperComponent', () => {
  let component: TeacherProgramWrapperComponent;
  let fixture: ComponentFixture<TeacherProgramWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherProgramWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProgramWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
