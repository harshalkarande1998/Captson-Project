import { TestBed } from '@angular/core/testing';

import { TaskProrityTransferService } from './task-prority-transfer.service';

describe('TaskProrityTransferService', () => {
  let service: TaskProrityTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskProrityTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
