import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDropOutTabRequestComponent } from './student-drop-out-tab-request.component';

describe('StudentDropOutTabRequestComponent', () => {
  let component: StudentDropOutTabRequestComponent;
  let fixture: ComponentFixture<StudentDropOutTabRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDropOutTabRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDropOutTabRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
