import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAdminScientificProblemComponent } from './card-admin-scientific-problem.component';

describe('CardAdminScientificProblemComponent', () => {
  let component: CardAdminScientificProblemComponent;
  let fixture: ComponentFixture<CardAdminScientificProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardAdminScientificProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAdminScientificProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
