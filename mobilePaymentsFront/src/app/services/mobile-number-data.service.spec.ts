import { TestBed } from '@angular/core/testing';

import { MobileNumberDataService } from './mobile-number-data.service';

describe('MobileDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MobileNumberDataService = TestBed.inject(MobileNumberDataService);
    expect(service).toBeTruthy();
  });
});
