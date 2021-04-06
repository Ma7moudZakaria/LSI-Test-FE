import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeCardComponent } from './custome-card.component';

describe('CustomeCardComponent', () => {
  let component: CustomeCardComponent;
  let fixture: ComponentFixture<CustomeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
