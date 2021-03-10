import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkThroughPagesComponent } from './walk-through-pages.component';

describe('WalkThroughPagesComponent', () => {
  let component: WalkThroughPagesComponent;
  let fixture: ComponentFixture<WalkThroughPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkThroughPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkThroughPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
