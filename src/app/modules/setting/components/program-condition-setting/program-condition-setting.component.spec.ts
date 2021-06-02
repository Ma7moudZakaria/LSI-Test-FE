import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramConditionSettingComponent } from './program-condition-setting.component';

describe('ProgramConditionSettingComponent', () => {
  let component: ProgramConditionSettingComponent;
  let fixture: ComponentFixture<ProgramConditionSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramConditionSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramConditionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
