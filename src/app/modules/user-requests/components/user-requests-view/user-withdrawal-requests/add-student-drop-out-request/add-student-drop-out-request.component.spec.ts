import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentDropOutRequestComponent } from './add-student-drop-out-request.component';

describe('AddStudentDropOutRequestComponent', () => {
  let component: AddStudentDropOutRequestComponent;
  let fixture: ComponentFixture<AddStudentDropOutRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentDropOutRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentDropOutRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
