import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuListRequestComponent } from './stu-list-request.component';

describe('StuListRequestComponent', () => {
  let component: StuListRequestComponent;
  let fixture: ComponentFixture<StuListRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuListRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuListRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
