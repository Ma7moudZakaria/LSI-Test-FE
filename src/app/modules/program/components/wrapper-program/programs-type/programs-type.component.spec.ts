import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsTypeComponent } from './programs-type.component';

describe('ProgramsTypeComponent', () => {
  let component: ProgramsTypeComponent;
  let fixture: ComponentFixture<ProgramsTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramsTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
