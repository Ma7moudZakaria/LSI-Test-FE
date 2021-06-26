import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramConditionsNumberStudentSubscribtionComponent } from './program-conditions-number-student-subscribtion.component';

describe('ProgramConditionsNumberStudentSubscribtionComponent', () => {
  let component: ProgramConditionsNumberStudentSubscribtionComponent;
  let fixture: ComponentFixture<ProgramConditionsNumberStudentSubscribtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramConditionsNumberStudentSubscribtionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramConditionsNumberStudentSubscribtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
