import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSreachListComponent } from './input-sreach-list.component';

describe('InputSreachListComponent', () => {
  let component: InputSreachListComponent;
  let fixture: ComponentFixture<InputSreachListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSreachListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSreachListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
