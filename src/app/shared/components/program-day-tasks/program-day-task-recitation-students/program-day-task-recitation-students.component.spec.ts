import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDayTaskRecitationStudentsComponent } from './program-day-task-recitation-students.component';

describe('ProgramDayTaskRecitationStudentsComponent', () => {
  let component: ProgramDayTaskRecitationStudentsComponent;
  let fixture: ComponentFixture<ProgramDayTaskRecitationStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDayTaskRecitationStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDayTaskRecitationStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
