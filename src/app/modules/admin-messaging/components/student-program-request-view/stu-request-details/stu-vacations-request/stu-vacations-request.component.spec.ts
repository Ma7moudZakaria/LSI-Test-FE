import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuVacationsRequestComponent } from './stu-vacations-request.component';

describe('StuVacationsRequestComponent', () => {
  let component: StuVacationsRequestComponent;
  let fixture: ComponentFixture<StuVacationsRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuVacationsRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuVacationsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
