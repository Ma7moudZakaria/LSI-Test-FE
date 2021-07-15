import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacheRejectedComponent } from './teache-rejected.component';

describe('TeacheRejectedComponent', () => {
  let component: TeacheRejectedComponent;
  let fixture: ComponentFixture<TeacheRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacheRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacheRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
