import { TestBed } from '@angular/core/testing';

import { ProgramCategoriesService } from './program-categories.service';

describe('ProgramCategoriesService', () => {
  let service: ProgramCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
