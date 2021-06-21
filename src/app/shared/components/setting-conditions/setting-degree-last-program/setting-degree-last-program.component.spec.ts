import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDegreeLastProgramComponent } from './setting-degree-last-program.component';

describe('SettingDegreeLastProgramComponent', () => {
  let component: SettingDegreeLastProgramComponent;
  let fixture: ComponentFixture<SettingDegreeLastProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingDegreeLastProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingDegreeLastProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
