import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherDropOutRequestAdminGridComponent } from './teacher-drop-out-request-admin-grid.component';


describe('TeacherDropOutRequestAdminGridComponent', () => {
  let component: TeacherDropOutRequestAdminGridComponent;
  let fixture: ComponentFixture<TeacherDropOutRequestAdminGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDropOutRequestAdminGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDropOutRequestAdminGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
