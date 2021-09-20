import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRecitationGroupsComponent } from './teacher-recitation-groups.component';

describe('TeacherRecitationGroupsComponent', () => {
  let component: TeacherRecitationGroupsComponent;
  let fixture: ComponentFixture<TeacherRecitationGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherRecitationGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRecitationGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
