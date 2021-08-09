import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSystemSubscriptionRejectedComponent } from './teacher-system-subscription-rejected.component';

describe('TeacherSystemSubscriptionRejectedComponent', () => {
  let component: TeacherSystemSubscriptionRejectedComponent;
  let fixture: ComponentFixture<TeacherSystemSubscriptionRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherSystemSubscriptionRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSystemSubscriptionRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
