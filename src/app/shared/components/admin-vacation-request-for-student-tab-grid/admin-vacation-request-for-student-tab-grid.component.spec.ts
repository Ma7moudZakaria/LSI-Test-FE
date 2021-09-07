import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVacationRequestForStudentTabGridComponent } from './admin-vacation-request-for-student-tab-grid.component';

describe('AdminVacationRequestForStudentTabGridComponent', () => {
  let component: AdminVacationRequestForStudentTabGridComponent;
  let fixture: ComponentFixture<AdminVacationRequestForStudentTabGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVacationRequestForStudentTabGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVacationRequestForStudentTabGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
