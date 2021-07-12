import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuTabRequestComponent } from './stu-tab-request.component';

describe('StuTabRequestComponent', () => {
  let component: StuTabRequestComponent;
  let fixture: ComponentFixture<StuTabRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuTabRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuTabRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
