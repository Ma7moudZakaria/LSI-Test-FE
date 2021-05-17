import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupUsersCardComponent } from './group-users-card.component';

describe('GroupUsersCardComponent', () => {
  let component: GroupUsersCardComponent;
  let fixture: ComponentFixture<GroupUsersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupUsersCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupUsersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
