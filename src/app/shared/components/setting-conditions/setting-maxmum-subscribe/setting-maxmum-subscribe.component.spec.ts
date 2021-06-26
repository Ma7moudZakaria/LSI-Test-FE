import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingMaxmumSubscribeComponent } from './setting-maxmum-subscribe.component';

describe('SettingMaxmumSubscribeComponent', () => {
  let component: SettingMaxmumSubscribeComponent;
  let fixture: ComponentFixture<SettingMaxmumSubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingMaxmumSubscribeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingMaxmumSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
