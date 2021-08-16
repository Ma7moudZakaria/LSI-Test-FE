import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramListComponent } from './student-program-list.component';

describe('StudentProgramListComponent', () => {
  let component: StudentProgramListComponent;
  let fixture: ComponentFixture<StudentProgramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgramListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
