import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScientificProblemListViewComponent } from './user-scientific-problem-list-view.component';

describe('UserScientificProblemListViewComponent', () => {
  let component: UserScientificProblemListViewComponent;
  let fixture: ComponentFixture<UserScientificProblemListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserScientificProblemListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserScientificProblemListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
