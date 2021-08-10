import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDropOutRequestComponent } from './add-drop-out-request.component';

describe('AddDropOutRequestComponent', () => {
  let component: AddDropOutRequestComponent;
  let fixture: ComponentFixture<AddDropOutRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDropOutRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDropOutRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
