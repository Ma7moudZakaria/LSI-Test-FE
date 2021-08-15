import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRequestsViewDetailsComponent } from './teacher-requests-view-details.component';

describe('TeacherRequestsViewDetailsComponent', () => {
  let component: TeacherRequestsViewDetailsComponent;
  let fixture: ComponentFixture<TeacherRequestsViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherRequestsViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRequestsViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
