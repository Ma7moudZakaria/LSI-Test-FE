import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRecitationWrapperComponent } from './teacher-recitation-wrapper.component';

describe('TeacherRecitationWrapperComponent', () => {
  let component: TeacherRecitationWrapperComponent;
  let fixture: ComponentFixture<TeacherRecitationWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherRecitationWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRecitationWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
