import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAvailableRequestStuComponent } from './change-available-request-stu.component';

describe('ChangeAvailableRequestStuComponent', () => {
  let component: ChangeAvailableRequestStuComponent;
  let fixture: ComponentFixture<ChangeAvailableRequestStuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAvailableRequestStuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAvailableRequestStuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
