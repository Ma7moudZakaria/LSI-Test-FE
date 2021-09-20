import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRecitationJoinRequestComponent } from './teacher-recitation-join-request.component';

describe('TeacherRecitationJoinRequestComponent', () => {
  let component: TeacherRecitationJoinRequestComponent;
  let fixture: ComponentFixture<TeacherRecitationJoinRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherRecitationJoinRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRecitationJoinRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
