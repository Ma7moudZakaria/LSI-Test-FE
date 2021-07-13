import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangTimeRequestComponent } from './chang-time-request.component';

describe('ChangTimeRequestComponent', () => {
  let component: ChangTimeRequestComponent;
  let fixture: ComponentFixture<ChangTimeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangTimeRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangTimeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
