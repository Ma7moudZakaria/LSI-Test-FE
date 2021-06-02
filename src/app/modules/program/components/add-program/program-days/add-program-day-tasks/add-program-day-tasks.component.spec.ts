import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramDayTasksComponent } from './add-program-day-tasks.component';

describe('AddProgramDayTasksComponent', () => {
  let component: AddProgramDayTasksComponent;
  let fixture: ComponentFixture<AddProgramDayTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgramDayTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgramDayTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
