import { TestBed } from '@angular/core/testing';

import { MemberTransferService } from './member-transfer.service';

describe('MemberTransferService', () => {
  let service: MemberTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
