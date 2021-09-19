import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllAvailableStudentGridComponent } from './get-all-available-student-grid.component';

describe('GetAllAvailableStudentGridComponent', () => {
  let component: GetAllAvailableStudentGridComponent;
  let fixture: ComponentFixture<GetAllAvailableStudentGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllAvailableStudentGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllAvailableStudentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
