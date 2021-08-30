import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStuTabsDetailsComponent } from './admin-stu-tabs-details.component';

describe('AdminStuTabsDetailsComponent', () => {
  let component: AdminStuTabsDetailsComponent;
  let fixture: ComponentFixture<AdminStuTabsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStuTabsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStuTabsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
