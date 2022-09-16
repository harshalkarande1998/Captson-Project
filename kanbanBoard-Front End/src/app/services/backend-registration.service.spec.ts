import { TestBed } from '@angular/core/testing';

import { BackendRegistrationService } from './backend-registration.service';

describe('BackendRegistrationService', () => {
  let service: BackendRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
