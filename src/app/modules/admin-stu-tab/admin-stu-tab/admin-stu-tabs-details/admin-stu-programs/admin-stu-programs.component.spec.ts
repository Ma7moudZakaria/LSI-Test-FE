import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStuProgramsComponent } from './admin-stu-programs.component';

describe('AdminStuProgramsComponent', () => {
  let component: AdminStuProgramsComponent;
  let fixture: ComponentFixture<AdminStuProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStuProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStuProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
