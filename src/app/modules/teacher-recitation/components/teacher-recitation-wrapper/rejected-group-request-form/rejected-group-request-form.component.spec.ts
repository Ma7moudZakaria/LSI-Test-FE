import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedGroupRequestFormComponent } from './rejected-group-request-form.component';

describe('RejectedGroupRequestFormComponent', () => {
  let component: RejectedGroupRequestFormComponent;
  let fixture: ComponentFixture<RejectedGroupRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedGroupRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedGroupRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
