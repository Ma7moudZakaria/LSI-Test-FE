import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentVacationRequestTabComponent } from './student-vacation-request-tab.component';

describe('StudentVacationRequestTabComponent', () => {
  let component: StudentVacationRequestTabComponent;
  let fixture: ComponentFixture<StudentVacationRequestTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentVacationRequestTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentVacationRequestTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
