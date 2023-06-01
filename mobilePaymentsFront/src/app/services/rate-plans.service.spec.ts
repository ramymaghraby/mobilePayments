import { TestBed } from '@angular/core/testing';

import { RatePlansService } from './rate-plans.service';

describe('RatePlansService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RatePlansService = TestBed.inject(RatePlansService);
    expect(service).toBeTruthy();
  });
});
