import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPartQraanComponent } from './setting-part-qraan.component';

describe('SettingPartQraanComponent', () => {
  let component: SettingPartQraanComponent;
  let fixture: ComponentFixture<SettingPartQraanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPartQraanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPartQraanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
