import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllAvailableTeachersCardComponent } from './get-all-available-teachers-card.component';

describe('GetAllAvailableTeachersCardComponent', () => {
  let component: GetAllAvailableTeachersCardComponent;
  let fixture: ComponentFixture<GetAllAvailableTeachersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllAvailableTeachersCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllAvailableTeachersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
