import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRecitationRequestComponent } from './teacher-recitation-request.component';

describe('TeacherRecitationRequestComponent', () => {
  let component: TeacherRecitationRequestComponent;
  let fixture: ComponentFixture<TeacherRecitationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherRecitationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRecitationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
