import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuRejectedComponent } from './stu-rejected.component';

describe('StuRejectedComponent', () => {
  let component: StuRejectedComponent;
  let fixture: ComponentFixture<StuRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
