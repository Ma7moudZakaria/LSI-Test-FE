import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgBatchesDetailsComponent } from './prog-batches-details.component';

describe('ProgBatchesDetailsComponent', () => {
  let component: ProgBatchesDetailsComponent;
  let fixture: ComponentFixture<ProgBatchesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgBatchesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgBatchesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
