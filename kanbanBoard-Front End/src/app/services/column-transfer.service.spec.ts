import { TestBed } from '@angular/core/testing';

import { ColumnTransferService } from './column-transfer.service';

describe('ColumnTransferService', () => {
  let service: ColumnTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
