import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HonoraryBoardComponent } from './honorary-board.component';

describe('HonoraryBoardComponent', () => {
  let component: HonoraryBoardComponent;
  let fixture: ComponentFixture<HonoraryBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HonoraryBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HonoraryBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
