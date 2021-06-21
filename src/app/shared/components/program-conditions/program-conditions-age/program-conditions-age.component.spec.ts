import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramConditionsAgeComponent } from './program-conditions-age.component';

describe('ProgramConditionsAgeComponent', () => {
  let component: ProgramConditionsAgeComponent;
  let fixture: ComponentFixture<ProgramConditionsAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramConditionsAgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramConditionsAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
