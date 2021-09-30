import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewStudentInGroupComponent } from './add-new-student-in-group.component';

describe('AddNewStudentInGroupComponent', () => {
  let component: AddNewStudentInGroupComponent;
  let fixture: ComponentFixture<AddNewStudentInGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewStudentInGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewStudentInGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
