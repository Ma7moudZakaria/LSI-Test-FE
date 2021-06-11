import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeelingsComponent } from './list-feelings.component';

describe('ListFeelingsComponent', () => {
  let component: ListFeelingsComponent;
  let fixture: ComponentFixture<ListFeelingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFeelingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFeelingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
