import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStuBasicInfoComponent } from './admin-stu-basic-info.component';

describe('AdminStuBasicInfoComponent', () => {
  let component: AdminStuBasicInfoComponent;
  let fixture: ComponentFixture<AdminStuBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStuBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStuBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
