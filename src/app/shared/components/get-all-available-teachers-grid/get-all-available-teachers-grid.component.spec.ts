import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllAvailableTeachersGridComponent } from './get-all-available-teachers-grid.component';

describe('GetAllAvailableTeachersGridComponent', () => {
  let component: GetAllAvailableTeachersGridComponent;
  let fixture: ComponentFixture<GetAllAvailableTeachersGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllAvailableTeachersGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllAvailableTeachersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
