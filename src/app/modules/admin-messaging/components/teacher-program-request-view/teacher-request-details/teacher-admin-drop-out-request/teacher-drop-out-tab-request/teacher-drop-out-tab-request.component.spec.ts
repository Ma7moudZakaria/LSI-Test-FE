import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherDropOutTabRequestComponent } from './teacher-drop-out-tab-request.component';

describe('TeacherDropOutTabRequestComponent', () => {
  let component: TeacherDropOutTabRequestComponent;
  let fixture: ComponentFixture<TeacherDropOutTabRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDropOutTabRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDropOutTabRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
