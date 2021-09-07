import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgDutiesComponent } from './student-prog-duties.component';

describe('StudentProgDutiesComponent', () => {
  let component: StudentProgDutiesComponent;
  let fixture: ComponentFixture<StudentProgDutiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgDutiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgDutiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
