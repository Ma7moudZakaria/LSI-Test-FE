import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramSubViewComponent } from './student-program-sub-view.component';

describe('StudentProgramSubViewComponent', () => {
  let component: StudentProgramSubViewComponent;
  let fixture: ComponentFixture<StudentProgramSubViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgramSubViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgramSubViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
