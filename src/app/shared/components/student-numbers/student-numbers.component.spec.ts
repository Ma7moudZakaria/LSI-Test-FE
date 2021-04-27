import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNumbersComponent } from './student-numbers.component';

describe('StudentNumbersComponent', () => {
  let component: StudentNumbersComponent;
  let fixture: ComponentFixture<StudentNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentNumbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
