import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStuDropOutComponent } from './admin-stu-drop-out.component';

describe('AdminStuDropOutComponent', () => {
  let component: AdminStuDropOutComponent;
  let fixture: ComponentFixture<AdminStuDropOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStuDropOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStuDropOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
