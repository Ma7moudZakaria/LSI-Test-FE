import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingQualificationsComponent } from './setting-qualifications.component';

describe('SettingQualificationsComponent', () => {
  let component: SettingQualificationsComponent;
  let fixture: ComponentFixture<SettingQualificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingQualificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
