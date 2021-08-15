import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdminDropOutRequestComponent } from './student-admin-drop-out-request.component';

describe('StudentAdminDropOutRequestComponent', () => {
  let component: StudentAdminDropOutRequestComponent;
  let fixture: ComponentFixture<StudentAdminDropOutRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAdminDropOutRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAdminDropOutRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
