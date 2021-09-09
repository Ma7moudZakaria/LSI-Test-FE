import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeacherTabComponent } from './admin-teacher-tab.component';

describe('AdminTeacherTabComponent', () => {
  let component: AdminTeacherTabComponent;
  let fixture: ComponentFixture<AdminTeacherTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeacherTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeacherTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
