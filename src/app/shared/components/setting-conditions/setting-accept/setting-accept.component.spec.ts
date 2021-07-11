import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAcceptComponent } from './setting-accept.component';

describe('SettingAcceptComponent', () => {
  let component: SettingAcceptComponent;
  let fixture: ComponentFixture<SettingAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingAcceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
