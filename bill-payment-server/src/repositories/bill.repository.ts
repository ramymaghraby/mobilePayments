import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor
} from '@loopback/repository';
import { Bill, BillRelations, MobileNumber } from '../models';
import { DbContextDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { MobileNumberRepository } from './mobile-number.repository';

export class BillRepository extends DefaultCrudRepository<
  Bill,
  typeof Bill.prototype.id,
  BillRelations
  > {
  public readonly mobileNumber: BelongsToAccessor<
    MobileNumber,
    typeof Bill.prototype.id
  >;
  constructor(
    @inject('datasources.dbContext') dataSource: DbContextDataSource,
    @repository.getter('MobileNumberRepository')
    protected mobileNumberRepositoryGetter: Getter<MobileNumberRepository>,
  ) {
    super(Bill, dataSource);
    this.mobileNumber = this.createBelongsToAccessorFor(
      'mobileNumber',
      mobileNumberRepositoryGetter,
    );
    this.registerInclusionResolver(
      'mobileNumber',
      this.mobileNumber.inclusionResolver,
    );
  }
}
