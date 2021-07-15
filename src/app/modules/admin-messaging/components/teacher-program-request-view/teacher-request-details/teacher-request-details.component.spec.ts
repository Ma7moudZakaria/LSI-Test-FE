import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRequestDetailsComponent } from './teacher-request-details.component';

describe('TeacherRequestDetailsComponent', () => {
  let component: TeacherRequestDetailsComponent;
  let fixture: ComponentFixture<TeacherRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherRequestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
