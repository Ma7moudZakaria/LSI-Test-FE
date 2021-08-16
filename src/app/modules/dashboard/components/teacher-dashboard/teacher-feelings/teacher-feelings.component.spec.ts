import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherFeelingsComponent } from './teacher-feelings.component';

describe('TeacherFeelingsComponent', () => {
  let component: TeacherFeelingsComponent;
  let fixture: ComponentFixture<TeacherFeelingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherFeelingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherFeelingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
