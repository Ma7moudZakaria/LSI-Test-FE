import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAgeComponent } from './setting-age.component';

describe('SettingAgeComponent', () => {
  let component: SettingAgeComponent;
  let fixture: ComponentFixture<SettingAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingAgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
