import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVacationRequestForStudentTabCardComponent } from './admin-vacation-request-for-student-tab-card.component';

describe('AdminVacationRequestForStudentTabCardComponent', () => {
  let component: AdminVacationRequestForStudentTabCardComponent;
  let fixture: ComponentFixture<AdminVacationRequestForStudentTabCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVacationRequestForStudentTabCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVacationRequestForStudentTabCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
