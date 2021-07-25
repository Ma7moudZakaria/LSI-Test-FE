import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherJoinRequestProgramComponent } from './teacher-join-request-program.component';

describe('TeacherJoinRequestProgramComponent', () => {
  let component: TeacherJoinRequestProgramComponent;
  let fixture: ComponentFixture<TeacherJoinRequestProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherJoinRequestProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherJoinRequestProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
