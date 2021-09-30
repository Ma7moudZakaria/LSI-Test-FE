import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGroupCardsComponent } from './student-group-cards.component';

describe('StudentGroupCardsComponent', () => {
  let component: StudentGroupCardsComponent;
  let fixture: ComponentFixture<StudentGroupCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentGroupCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGroupCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
