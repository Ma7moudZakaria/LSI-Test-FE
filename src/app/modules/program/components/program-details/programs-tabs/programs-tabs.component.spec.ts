import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsTabsComponent } from './programs-tabs.component';

describe('ProgramsTabsComponent', () => {
  let component: ProgramsTabsComponent;
  let fixture: ComponentFixture<ProgramsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramsTabsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
