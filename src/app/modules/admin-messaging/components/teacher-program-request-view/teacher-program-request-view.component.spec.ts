import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProgramRequestViewComponent } from './teacher-program-request-view.component';

describe('TeacherProgramRequestViewComponent', () => {
  let component: TeacherProgramRequestViewComponent;
  let fixture: ComponentFixture<TeacherProgramRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherProgramRequestViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProgramRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
