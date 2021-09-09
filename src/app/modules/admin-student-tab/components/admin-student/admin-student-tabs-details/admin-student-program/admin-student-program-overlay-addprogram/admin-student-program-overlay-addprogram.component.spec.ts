import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentProgramOverlayAddprogramComponent } from './admin-student-program-overlay-addprogram.component';

describe('AdminStudentProgramOverlayAddprogramComponent', () => {
  let component: AdminStudentProgramOverlayAddprogramComponent;
  let fixture: ComponentFixture<AdminStudentProgramOverlayAddprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentProgramOverlayAddprogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentProgramOverlayAddprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
