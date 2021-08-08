import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherSystemCardRequestComponent } from './teacher-system-card-request.component';


describe('TeacherSystemCardRequestComponent', () => {
  let component: TeacherSystemCardRequestComponent;
  let fixture: ComponentFixture<TeacherSystemCardRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherSystemCardRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSystemCardRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
