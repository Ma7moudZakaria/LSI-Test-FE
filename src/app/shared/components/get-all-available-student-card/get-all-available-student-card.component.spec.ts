import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllAvailableStudentCardComponent } from './get-all-available-student-card.component';

describe('GetAllAvailableStudentCardComponent', () => {
  let component: GetAllAvailableStudentCardComponent;
  let fixture: ComponentFixture<GetAllAvailableStudentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllAvailableStudentCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllAvailableStudentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
