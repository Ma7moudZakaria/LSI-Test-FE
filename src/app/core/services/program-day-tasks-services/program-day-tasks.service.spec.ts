import { TestBed } from '@angular/core/testing';
import { ProgramDayTasksService } from './program-day-tasks.service';

describe('ProgramDayTasksService', () => {
  let service: ProgramDayTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramDayTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
