import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSystemSubscriptionGridComponent } from './teacher-system-subscription-grid.component';

describe('TeacherSystemSubscriptionGridComponent', () => {
  let component: TeacherSystemSubscriptionGridComponent;
  let fixture: ComponentFixture<TeacherSystemSubscriptionGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherSystemSubscriptionGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSystemSubscriptionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
