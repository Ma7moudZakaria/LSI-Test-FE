import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNotifacationsComponent } from './card-notifacations.component';

describe('CardNotifacationsComponent', () => {
  let component: CardNotifacationsComponent;
  let fixture: ComponentFixture<CardNotifacationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardNotifacationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNotifacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
