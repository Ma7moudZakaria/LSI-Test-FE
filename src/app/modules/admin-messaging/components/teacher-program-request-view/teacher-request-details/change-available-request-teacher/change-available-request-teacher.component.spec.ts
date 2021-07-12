import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAvailableRequestTeacherComponent } from './change-available-request-teacher.component';

describe('ChangeAvailableRequestTeacherComponent', () => {
  let component: ChangeAvailableRequestTeacherComponent;
  let fixture: ComponentFixture<ChangeAvailableRequestTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAvailableRequestTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAvailableRequestTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
