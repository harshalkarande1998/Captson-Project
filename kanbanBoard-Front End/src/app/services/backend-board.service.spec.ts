import { TestBed } from '@angular/core/testing';

import { BackendBoardService } from './backend-board.service';

describe('BackendBoardService', () => {
  let service: BackendBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
