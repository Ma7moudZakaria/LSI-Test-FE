import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDetailsViewComponent } from './teacher-details-view.component';

describe('TeacherDetailsViewComponent', () => {
  let component: TeacherDetailsViewComponent;
  let fixture: ComponentFixture<TeacherDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDetailsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
