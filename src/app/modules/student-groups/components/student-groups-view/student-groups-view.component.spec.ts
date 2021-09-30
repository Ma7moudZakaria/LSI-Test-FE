import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGroupsViewComponent } from './student-groups-view.component';

describe('StudentGroupsViewComponent', () => {
  let component: StudentGroupsViewComponent;
  let fixture: ComponentFixture<StudentGroupsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentGroupsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGroupsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
