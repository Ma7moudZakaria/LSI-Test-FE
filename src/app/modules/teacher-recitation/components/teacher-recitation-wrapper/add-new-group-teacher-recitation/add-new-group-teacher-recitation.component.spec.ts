import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewGroupTeacherRecitationComponent } from './add-new-group-teacher-recitation.component';

describe('AddNewGroupTeacherRecitationComponent', () => {
  let component: AddNewGroupTeacherRecitationComponent;
  let fixture: ComponentFixture<AddNewGroupTeacherRecitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewGroupTeacherRecitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewGroupTeacherRecitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
