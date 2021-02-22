import { TestBed } from '@angular/core/testing';

import { ScientificMaterialService } from './scientific-material.service';

describe('ScientificMaterialService', () => {
  let service: ScientificMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScientificMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
