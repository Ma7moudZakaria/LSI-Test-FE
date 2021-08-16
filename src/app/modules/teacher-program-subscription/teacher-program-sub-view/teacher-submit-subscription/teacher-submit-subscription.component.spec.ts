import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSubmitSubscriptionComponent } from './teacher-submit-subscription.component';

describe('TeacherSubmitSubscriptionComponent', () => {
  let component: TeacherSubmitSubscriptionComponent;
  let fixture: ComponentFixture<TeacherSubmitSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherSubmitSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSubmitSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
