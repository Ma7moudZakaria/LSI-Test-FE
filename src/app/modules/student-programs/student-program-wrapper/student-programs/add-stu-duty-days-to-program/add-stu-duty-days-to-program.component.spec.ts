import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStuDutyDaysToProgramComponent } from './add-stu-duty-days-to-program.component';

describe('AddStuDutyDaysToProgramComponent', () => {
  let component: AddStuDutyDaysToProgramComponent;
  let fixture: ComponentFixture<AddStuDutyDaysToProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStuDutyDaysToProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStuDutyDaysToProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
