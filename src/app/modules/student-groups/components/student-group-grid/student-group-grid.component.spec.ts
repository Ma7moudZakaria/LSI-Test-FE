import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGroupGridComponent } from './student-group-grid.component';

describe('StudentGroupGridComponent', () => {
  let component: StudentGroupGridComponent;
  let fixture: ComponentFixture<StudentGroupGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentGroupGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGroupGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
