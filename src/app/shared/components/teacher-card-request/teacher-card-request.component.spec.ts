import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCardRequestComponent } from './teacher-card-request.component';

describe('TeacherCardRequestComponent', () => {
  let component: TeacherCardRequestComponent;
  let fixture: ComponentFixture<TeacherCardRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherCardRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCardRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
