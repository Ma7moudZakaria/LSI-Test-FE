import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotifacationsComponent } from './add-notifacations.component';

describe('AddNotifacationsComponent', () => {
  let component: AddNotifacationsComponent;
  let fixture: ComponentFixture<AddNotifacationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNotifacationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNotifacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
