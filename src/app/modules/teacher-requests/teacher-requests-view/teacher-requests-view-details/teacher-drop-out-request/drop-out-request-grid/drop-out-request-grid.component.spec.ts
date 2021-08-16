import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropOutRequestGridComponent } from './drop-out-request-grid.component';

describe('DropOutRequestGridComponent', () => {
  let component: DropOutRequestGridComponent;
  let fixture: ComponentFixture<DropOutRequestGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropOutRequestGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropOutRequestGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
