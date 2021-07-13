import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherListRequestComponent } from './teacher-list-request.component';

describe('TeacherListRequestComponent', () => {
  let component: TeacherListRequestComponent;
  let fixture: ComponentFixture<TeacherListRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherListRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherListRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
