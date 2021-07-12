import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuJoinRequestProgramComponent } from './stu-join-request-program.component';

describe('StuJoinRequestProgramComponent', () => {
  let component: StuJoinRequestProgramComponent;
  let fixture: ComponentFixture<StuJoinRequestProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuJoinRequestProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuJoinRequestProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
