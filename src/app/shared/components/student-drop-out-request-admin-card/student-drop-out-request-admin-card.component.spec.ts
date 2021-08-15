import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDropOutRequestAdminCardComponent } from './student-drop-out-request-admin-card.component';

describe('StudentDropOutRequestAdminCardComponent', () => {
  let component: StudentDropOutRequestAdminCardComponent;
  let fixture: ComponentFixture<StudentDropOutRequestAdminCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDropOutRequestAdminCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDropOutRequestAdminCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
