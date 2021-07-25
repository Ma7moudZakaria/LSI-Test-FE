import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuMovingRequestComponent } from './stu-moving-request.component';

describe('StuMovingRequestComponent', () => {
  let component: StuMovingRequestComponent;
  let fixture: ComponentFixture<StuMovingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuMovingRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuMovingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
