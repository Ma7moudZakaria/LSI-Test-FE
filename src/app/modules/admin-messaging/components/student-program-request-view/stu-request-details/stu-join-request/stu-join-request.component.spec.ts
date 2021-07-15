import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuJoinRequestComponent } from './stu-join-request.component';

describe('StuJoinRequestComponent', () => {
  let component: StuJoinRequestComponent;
  let fixture: ComponentFixture<StuJoinRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuJoinRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuJoinRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
