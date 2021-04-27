import { TestBed } from '@angular/core/testing';

import { ScientificProblemService } from './scientific-problem.service';

describe('ScientificProblemService', () => {
  let service: ScientificProblemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScientificProblemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
