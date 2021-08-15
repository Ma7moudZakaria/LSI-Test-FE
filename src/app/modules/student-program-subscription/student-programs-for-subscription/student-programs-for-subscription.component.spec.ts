import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramsForSubscriptionComponent } from './student-programs-for-subscription.component';

describe('StudentProgramsComponent', () => {
  let component: StudentProgramsForSubscriptionComponent;
  let fixture: ComponentFixture<StudentProgramsForSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgramsForSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgramsForSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
