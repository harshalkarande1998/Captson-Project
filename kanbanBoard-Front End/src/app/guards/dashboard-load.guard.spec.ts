import { TestBed } from '@angular/core/testing';

import { DashboardLoadGuard } from './dashboard-load.guard';

describe('DashboardLoadGuard', () => {
  let guard: DashboardLoadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashboardLoadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
