import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherJionProgramTabRequestComponent } from './teacher-join-program-tab-request.component';

describe('TeacherJionProgramTabRequestComponent', () => {
  let component: TeacherJionProgramTabRequestComponent;
  let fixture: ComponentFixture<TeacherJionProgramTabRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherJionProgramTabRequestComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherJionProgramTabRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
