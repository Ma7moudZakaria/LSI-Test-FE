import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsRatingComponent } from './students-rating.component';

describe('StudentsRatingComponent', () => {
  let component: StudentsRatingComponent;
  let fixture: ComponentFixture<StudentsRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
