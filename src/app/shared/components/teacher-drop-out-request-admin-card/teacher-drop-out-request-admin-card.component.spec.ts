import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherDropOutRequestAdminCardComponent } from './teacher-drop-out-request-admin-card.component';


describe('TeacherDropOutRequestAdminCardComponent', () => {
  let component: TeacherDropOutRequestAdminCardComponent;
  let fixture: ComponentFixture<TeacherDropOutRequestAdminCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDropOutRequestAdminCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDropOutRequestAdminCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
