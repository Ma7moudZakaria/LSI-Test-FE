import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProgramSubDetailsComponent } from './teacher-program-sub-details.component';

describe('TeacherProgramSubDetailsComponent', () => {
  let component: TeacherProgramSubDetailsComponent;
  let fixture: ComponentFixture<TeacherProgramSubDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherProgramSubDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProgramSubDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
