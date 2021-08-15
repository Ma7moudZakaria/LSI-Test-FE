import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDropOutRequestComponent } from './student-drop-out-request.component';

describe('StudentDropOutRequestComponent', () => {
  let component: StudentDropOutRequestComponent;
  let fixture: ComponentFixture<StudentDropOutRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDropOutRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDropOutRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
