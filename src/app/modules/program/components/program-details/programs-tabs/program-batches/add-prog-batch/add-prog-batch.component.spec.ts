import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgBatchComponent } from './add-prog-batch.component';

describe('AddProgBatchComponent', () => {
  let component: AddProgBatchComponent;
  let fixture: ComponentFixture<AddProgBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
