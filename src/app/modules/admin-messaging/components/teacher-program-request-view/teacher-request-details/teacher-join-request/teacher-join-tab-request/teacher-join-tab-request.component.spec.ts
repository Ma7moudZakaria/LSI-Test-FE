import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherJionTabRequestComponent } from './teacher-join-tab-request.component';

describe('TeacherJionTabRequestComponent', () => {
  let component: TeacherJionTabRequestComponent;
  let fixture: ComponentFixture<TeacherJionTabRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherJionTabRequestComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherJionTabRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
