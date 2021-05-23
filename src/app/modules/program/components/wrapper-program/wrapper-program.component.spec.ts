import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperProgramComponent } from './wrapper-program.component';

describe('WrapperProgramComponent', () => {
  let component: WrapperProgramComponent;
  let fixture: ComponentFixture<WrapperProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
