import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuCardRequestComponent } from './stu-card-request.component';

describe('StuCardRequestComponent', () => {
  let component: StuCardRequestComponent;
  let fixture: ComponentFixture<StuCardRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuCardRequestComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuCardRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
