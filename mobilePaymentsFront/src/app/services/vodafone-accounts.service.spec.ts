import { TestBed } from '@angular/core/testing';

import { VodafoneAccountsService } from './vodafone-accounts.service';

describe('VodafoneAccountsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VodafoneAccountsService = TestBed.get(VodafoneAccountsService);
    expect(service).toBeTruthy();
  });
});
