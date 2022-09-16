import { TestBed } from '@angular/core/testing';

import { BoardTransferService } from './board-transfer.service';

describe('BoardTransferService', () => {
  let service: BoardTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
