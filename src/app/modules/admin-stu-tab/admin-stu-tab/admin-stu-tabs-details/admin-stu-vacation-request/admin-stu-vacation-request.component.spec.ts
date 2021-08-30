import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStuVacationRequestComponent } from './admin-stu-vacation-request.component';

describe('AdminStuVacationRequestComponent', () => {
  let component: AdminStuVacationRequestComponent;
  let fixture: ComponentFixture<AdminStuVacationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStuVacationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStuVacationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
