import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFeelingsComponent } from './card-feelings.component';

describe('CardFeelingsComponent', () => {
  let component: CardFeelingsComponent;
  let fixture: ComponentFixture<CardFeelingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardFeelingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFeelingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
