import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeacherTabsDetailsComponent } from './admin-teacher-tabs-details.component';

describe('AdminTeacherTabsDetailsComponent', () => {
  let component: AdminTeacherTabsDetailsComponent;
  let fixture: ComponentFixture<AdminTeacherTabsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeacherTabsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeacherTabsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
