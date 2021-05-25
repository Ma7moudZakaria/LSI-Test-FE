import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicExameComponent } from './periodic-exame.component';

describe('PeriodicExameComponent', () => {
  let component: PeriodicExameComponent;
  let fixture: ComponentFixture<PeriodicExameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodicExameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicExameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
