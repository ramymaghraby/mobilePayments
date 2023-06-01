import { TestBed } from '@angular/core/testing';

import { BillsService } from './bills.service';

describe('HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillsService = TestBed.inject(BillsService);
    expect(service).toBeTruthy();
  });
});
