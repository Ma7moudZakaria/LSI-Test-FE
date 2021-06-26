import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingLastProgramComponent } from './setting-last-program.component';

describe('SettingLastProgramComponent', () => {
  let component: SettingLastProgramComponent;
  let fixture: ComponentFixture<SettingLastProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingLastProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingLastProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
