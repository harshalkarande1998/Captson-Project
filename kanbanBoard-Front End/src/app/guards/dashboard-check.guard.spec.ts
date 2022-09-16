import { TestBed } from '@angular/core/testing';

import { DashboardCheckGuard } from './dashboard-check.guard';

describe('DashboardCheckGuard', () => {
  let guard: DashboardCheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashboardCheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
