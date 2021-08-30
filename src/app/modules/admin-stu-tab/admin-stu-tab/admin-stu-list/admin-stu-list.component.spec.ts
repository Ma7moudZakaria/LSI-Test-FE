import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStuListComponent } from './admin-stu-list.component';

describe('AdminStuListComponent', () => {
  let component: AdminStuListComponent;
  let fixture: ComponentFixture<AdminStuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStuListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
