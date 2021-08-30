import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStuTabComponent } from './admin-stu-tab.component';

describe('AdminStuTabComponent', () => {
  let component: AdminStuTabComponent;
  let fixture: ComponentFixture<AdminStuTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStuTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStuTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
