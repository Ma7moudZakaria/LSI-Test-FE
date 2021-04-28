import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTeacherProfileComponent } from './update-teacher-profile.component';

describe('UpdateTeacherProfileComponent', () => {
  let component: UpdateTeacherProfileComponent;
  let fixture: ComponentFixture<UpdateTeacherProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTeacherProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTeacherProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
