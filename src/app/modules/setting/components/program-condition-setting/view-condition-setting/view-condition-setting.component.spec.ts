import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConditionSettingComponent } from './view-condition-setting.component';

describe('ViewConditionSettingComponent', () => {
  let component: ViewConditionSettingComponent;
  let fixture: ComponentFixture<ViewConditionSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewConditionSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConditionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
