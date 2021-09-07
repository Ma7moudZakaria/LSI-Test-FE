import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeacherBasicInfoComponent } from './admin-teacher-basic-info.component';

describe('AdminTeacherBasicInfoComponent', () => {
  let component: AdminTeacherBasicInfoComponent;
  let fixture: ComponentFixture<AdminTeacherBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeacherBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeacherBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
