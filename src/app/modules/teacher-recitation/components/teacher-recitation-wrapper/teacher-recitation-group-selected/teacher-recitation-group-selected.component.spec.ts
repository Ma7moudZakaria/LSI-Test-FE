import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRecitationGroupSelectedComponent } from './teacher-recitation-group-selected.component';

describe('TeacherRecitationGroupSelectedComponent', () => {
  let component: TeacherRecitationGroupSelectedComponent;
  let fixture: ComponentFixture<TeacherRecitationGroupSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherRecitationGroupSelectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRecitationGroupSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
