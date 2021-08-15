import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRequestsViewComponent } from './teacher-requests-view.component';

describe('TeacherRequestsViewComponent', () => {
  let component: TeacherRequestsViewComponent;
  let fixture: ComponentFixture<TeacherRequestsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherRequestsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
