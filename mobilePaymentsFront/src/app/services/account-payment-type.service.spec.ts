import { TestBed } from '@angular/core/testing';

import { AccountPaymentTypeService } from './account-payment-type.service';

describe('AccountPaymentTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountPaymentTypeService = TestBed.get(AccountPaymentTypeService);
    expect(service).toBeTruthy();
  });
});
