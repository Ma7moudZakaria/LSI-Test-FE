import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRecitationCallComponent } from './student-recitation-call.component';

describe('StudentRecitationCallComponent', () => {
  let component: StudentRecitationCallComponent;
  let fixture: ComponentFixture<StudentRecitationCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentRecitationCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRecitationCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
