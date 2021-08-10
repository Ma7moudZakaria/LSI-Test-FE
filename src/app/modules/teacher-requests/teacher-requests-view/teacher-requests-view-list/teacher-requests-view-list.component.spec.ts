import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRequestsViewListComponent } from './teacher-requests-view-list.component';

describe('TeacherRequestsViewListComponent', () => {
  let component: TeacherRequestsViewListComponent;
  let fixture: ComponentFixture<TeacherRequestsViewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherRequestsViewListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRequestsViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
