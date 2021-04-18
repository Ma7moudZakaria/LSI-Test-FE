import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuesionBankViewComponent } from './quesion-bank-view.component';

describe('QuesionBankViewComponent', () => {
  let component: QuesionBankViewComponent;
  let fixture: ComponentFixture<QuesionBankViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuesionBankViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuesionBankViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
