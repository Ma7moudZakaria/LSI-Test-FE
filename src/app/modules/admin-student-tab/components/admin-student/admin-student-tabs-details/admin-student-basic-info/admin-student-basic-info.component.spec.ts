import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentBasicInfoComponent } from './admin-student-basic-info.component';

describe('AdminStudentBasicInfoComponent', () => {
  let component: AdminStudentBasicInfoComponent;
  let fixture: ComponentFixture<AdminStudentBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
