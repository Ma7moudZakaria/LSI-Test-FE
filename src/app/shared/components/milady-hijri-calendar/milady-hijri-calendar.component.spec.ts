import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiladyHijriCalendarComponent } from './milady-hijri-calendar.component';

describe('MiladyHijriCalendarComponent', () => {
  let component: MiladyHijriCalendarComponent;
  let fixture: ComponentFixture<MiladyHijriCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiladyHijriCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiladyHijriCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
