import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramConditionsComponent } from './program-conditions.component';

describe('ProgramConditionsComponent', () => {
  let component: ProgramConditionsComponent;
  let fixture: ComponentFixture<ProgramConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
