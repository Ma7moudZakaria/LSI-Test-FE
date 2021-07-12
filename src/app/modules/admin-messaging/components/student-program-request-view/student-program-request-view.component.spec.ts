import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramRequestViewComponent } from './student-program-request-view.component';

describe('StudentProgramRequestViewComponent', () => {
  let component: StudentProgramRequestViewComponent;
  let fixture: ComponentFixture<StudentProgramRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgramRequestViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgramRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
