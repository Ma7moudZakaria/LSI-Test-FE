import { TestBed } from '@angular/core/testing';

import { ConditionSettingService } from './condition-setting.service';

describe('ConditionSettingService', () => {
  let service: ConditionSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConditionSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
