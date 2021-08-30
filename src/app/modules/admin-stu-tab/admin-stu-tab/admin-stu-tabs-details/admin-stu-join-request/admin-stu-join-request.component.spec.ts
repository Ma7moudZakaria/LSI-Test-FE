import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStuJoinRequestComponent } from './admin-stu-join-request.component';

describe('AdminStuJoinRequestComponent', () => {
  let component: AdminStuJoinRequestComponent;
  let fixture: ComponentFixture<AdminStuJoinRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStuJoinRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStuJoinRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
