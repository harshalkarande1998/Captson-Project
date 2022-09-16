import { TestBed } from '@angular/core/testing';

import { RuleTransferService } from './rule-transfer.service';

describe('RuleTransferService', () => {
  let service: RuleTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
