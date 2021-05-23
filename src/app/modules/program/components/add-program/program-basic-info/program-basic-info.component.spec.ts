import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramBasicInfoComponent } from './program-basic-info.component';

describe('ProgramBasicInfoComponent', () => {
  let component: ProgramBasicInfoComponent;
  let fixture: ComponentFixture<ProgramBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
