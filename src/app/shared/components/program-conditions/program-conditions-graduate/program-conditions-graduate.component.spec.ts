import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramConditionsGraduateComponent } from './program-conditions-graduate.component';

describe('ProgramConditionsGraduateComponent', () => {
  let component: ProgramConditionsGraduateComponent;
  let fixture: ComponentFixture<ProgramConditionsGraduateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramConditionsGraduateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramConditionsGraduateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
