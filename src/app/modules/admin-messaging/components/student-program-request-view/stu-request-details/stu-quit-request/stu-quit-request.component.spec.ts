import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuQuitRequestComponent } from './stu-quit-request.component';

describe('StuQuitRequestComponent', () => {
  let component: StuQuitRequestComponent;
  let fixture: ComponentFixture<StuQuitRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuQuitRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuQuitRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
