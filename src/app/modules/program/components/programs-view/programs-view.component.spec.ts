import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsViewComponent } from './programs-view.component';

describe('ProgramsViewComponent', () => {
  let component: ProgramsViewComponent;
  let fixture: ComponentFixture<ProgramsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
