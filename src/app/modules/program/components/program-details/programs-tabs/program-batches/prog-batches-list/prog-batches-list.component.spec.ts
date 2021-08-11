import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgBatchesListComponent } from './prog-batches-list.component';

describe('ProgBatchesListComponent', () => {
  let component: ProgBatchesListComponent;
  let fixture: ComponentFixture<ProgBatchesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgBatchesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgBatchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
