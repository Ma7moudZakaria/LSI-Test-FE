import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherJoinRequestComponent } from './teacher-join-request.component';

describe('TeacherJoinRequestComponent', () => {
  let component: TeacherJoinRequestComponent;
  let fixture: ComponentFixture<TeacherJoinRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherJoinRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherJoinRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
