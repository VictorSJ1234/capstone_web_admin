import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { dengueGuardGuard } from './dengue-guard.guard';

describe('dengueGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dengueGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
