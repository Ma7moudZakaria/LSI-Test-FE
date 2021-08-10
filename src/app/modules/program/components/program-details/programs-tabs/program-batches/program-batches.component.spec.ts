import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramBatchesComponent } from './program-batches.component';

describe('ProgramBatchesComponent', () => {
  let component: ProgramBatchesComponent;
  let fixture: ComponentFixture<ProgramBatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramBatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
