import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentTabsDetailsComponent } from './admin-student-tabs-details.component';

describe('AdminStudentTabsDetailsComponent', () => {
  let component: AdminStudentTabsDetailsComponent;
  let fixture: ComponentFixture<AdminStudentTabsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentTabsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentTabsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
