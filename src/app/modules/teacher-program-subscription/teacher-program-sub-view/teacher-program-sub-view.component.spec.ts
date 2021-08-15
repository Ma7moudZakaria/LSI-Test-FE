import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProgramSubViewComponent } from './teacher-program-sub-view.component';

describe('TeacherProgramSubViewComponent', () => {
  let component: TeacherProgramSubViewComponent;
  let fixture: ComponentFixture<TeacherProgramSubViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherProgramSubViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProgramSubViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
