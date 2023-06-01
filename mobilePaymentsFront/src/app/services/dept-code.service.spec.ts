import { TestBed } from '@angular/core/testing';

import { DeptCodeService } from './dept-code.service';

describe('DeptCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeptCodeService = TestBed.inject(DeptCodeService);
    expect(service).toBeTruthy();
  });
});
