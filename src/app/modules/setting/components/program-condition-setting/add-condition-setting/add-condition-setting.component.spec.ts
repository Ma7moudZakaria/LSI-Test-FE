import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConditionSettingComponent } from './add-condition-setting.component';

describe('AddConditionSettingComponent', () => {
  let component: AddConditionSettingComponent;
  let fixture: ComponentFixture<AddConditionSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConditionSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConditionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
