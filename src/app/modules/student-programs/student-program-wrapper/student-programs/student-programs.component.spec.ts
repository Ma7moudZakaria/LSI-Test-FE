import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramsComponent } from './student-programs.component';

describe('StudentProgramsComponent', () => {
  let component: StudentProgramsComponent;
  let fixture: ComponentFixture<StudentProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
