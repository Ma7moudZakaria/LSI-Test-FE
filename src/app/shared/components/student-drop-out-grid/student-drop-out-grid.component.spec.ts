import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDropOutGridComponent } from './student-drop-out-grid.component';

describe('StudentDropOutGridComponent', () => {
  let component: StudentDropOutGridComponent;
  let fixture: ComponentFixture<StudentDropOutGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDropOutGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDropOutGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
