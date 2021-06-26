import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramExamesComponent } from './program-exames.component';

describe('ProgramExamesComponent', () => {
  let component: ProgramExamesComponent;
  let fixture: ComponentFixture<ProgramExamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramExamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramExamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
