import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuRequestDetailsComponent } from './stu-request-details.component';

describe('StuRequestDetailsComponent', () => {
  let component: StuRequestDetailsComponent;
  let fixture: ComponentFixture<StuRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuRequestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
