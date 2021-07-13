import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherTabRequestComponent } from './teacher-tab-request.component';

describe('TeacherTabRequestComponent', () => {
  let component: TeacherTabRequestComponent;
  let fixture: ComponentFixture<TeacherTabRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherTabRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherTabRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
